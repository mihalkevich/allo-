#!/usr/bin/env python3
"""Контакт-парсер базы компаний (companies-base.csv).

Собирает ПУБЛИЧНЫЕ контакты организаций с их официальных сайтов:
телефоны, email и ссылки на официальные соцсети — и дописывает их в CSV.

ОКРУЖЕНИЕ:
  В облачном контейнере Claude Code исходящая сеть закрыта политикой
  окружения (даже example.com отдаёт 403) — здесь парсер не отработает.
  Запускать на своей машине или сервере с открытым интернетом.

ЛЕГАЛЬНОСТЬ (см. docs/campaign/12-phone-audience-ads.md и 18-contact-collector-agent.md):
  - только публичные контакты УРОВНЯ ОРГАНИЗАЦИИ с официальных сайтов;
  - robots.txt уважается;
  - rate-limiting включён, User-Agent реалистичный;
  - персональные данные из закрытых разделов не собираются.

Зависимости: requests, beautifulsoup4 (см. requirements.txt).

Пример запуска:
  python3 contact_parser.py --input ../companies-base.csv \\
      --output ../companies-base-enriched.csv --delay 3
"""
import argparse
import csv
import re
import sys
import time
import urllib.robotparser
from datetime import date
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
HEADERS = {
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
}

EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
PHONE_RE = re.compile(
    r"(?:\+?375|8[\s\-]?0?\d{2}|\(?0\d{2}\)?)[\s\-()]*\d{2,3}"
    r"[\s\-()]*\d{2,3}[\s\-()]*\d{2}[\s\-()]*\d{0,2}"
)
SOCIAL_HOSTS = ("facebook.com", "fb.com", "instagram.com", "t.me",
                "telegram.me", "vk.com", "linkedin.com", "youtube.com",
                "youtu.be", "ok.ru", "tiktok.com")
CONTACT_HINTS = ("contact", "kontakt", "контакт", "about", "o-kompanii",
                 "o-nas", "company", "feedback", "связ")
JUNK_EMAIL = ("example.", "sentry.", "wixpress.", "godaddy.", "domain.com",
              "email.com", "@2x", ".png", ".jpg", ".gif", ".webp", "@sentry")
GOOD_LOCALPARTS = ("info", "office", "contact", "mail", "marketing", "pr",
                   "press", "sales", "hello", "reception", "corp", "company")


def normalize_url(site: str) -> str:
    site = (site or "").strip()
    if not site:
        return ""
    if not site.startswith(("http://", "https://")):
        site = "https://" + site
    return site


def robots_allowed(base_url: str, path_url: str) -> bool:
    """Проверяет robots.txt. При недоступности robots.txt — разрешаем."""
    try:
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(urljoin(base_url, "/robots.txt"))
        rp.read()
        return rp.can_fetch(UA, path_url)
    except Exception:
        return True


def fetch(session: requests.Session, url: str, timeout: int):
    try:
        r = session.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        if r.status_code == 200 and "text/html" in r.headers.get("Content-Type", ""):
            return r.text
    except requests.RequestException:
        return None
    return None


def find_contact_links(html: str, base_url: str, limit: int = 4):
    soup = BeautifulSoup(html, "html.parser")
    found, seen = [], set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        text = (a.get_text() or "").lower()
        if any(h in href.lower() or h in text for h in CONTACT_HINTS):
            full = urljoin(base_url, href)
            if full not in seen and urlparse(full).netloc == urlparse(base_url).netloc:
                seen.add(full)
                found.append(full)
        if len(found) >= limit:
            break
    return found


def normalize_phone(raw: str):
    d = re.sub(r"\D", "", raw)
    if d.startswith("375") and len(d) == 12:
        core = d
    elif d.startswith("80") and len(d) == 11:
        core = "375" + d[2:]
    else:
        return None
    return f"+{core[:3]} {core[3:5]} {core[5:8]}-{core[8:10]}-{core[10:12]}"


def extract_phones(text: str):
    out = []
    for m in PHONE_RE.findall(text):
        p = normalize_phone(m)
        if p and p not in out:
            out.append(p)
    return out


def extract_emails(text: str, site_host: str):
    raw = {e.lower() for e in EMAIL_RE.findall(text)}
    clean = [e for e in raw if not any(j in e for j in JUNK_EMAIL)]

    def score(e: str) -> int:
        local, _, host = e.partition("@")
        s = 0
        if site_host and site_host.replace("www.", "") in host:
            s += 2
        if local in GOOD_LOCALPARTS:
            s += 1
        return s

    return sorted(clean, key=score, reverse=True)


def extract_socials(html: str):
    soup = BeautifulSoup(html, "html.parser")
    out, seen = [], set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        host = urlparse(href).netloc.lower().replace("www.", "")
        if any(host == s or host.endswith("." + s) for s in SOCIAL_HOSTS):
            if href not in seen:
                seen.add(href)
                out.append(href.split("?")[0])
    return out


def process_company(session, row, timeout):
    site = normalize_url(row.get("Сайт", ""))
    if not site:
        return row, "нет сайта", ""

    host = urlparse(site).netloc.lower()
    pages, phones, emails, socials, sources = [site], [], [], [], []

    home = fetch(session, site, timeout)
    if home is None:
        return row, "ошибка", ""
    pages += find_contact_links(home, site)

    for url in pages:
        if not robots_allowed(site, url):
            continue
        html = home if url == site else fetch(session, url, timeout)
        if not html:
            continue
        text = BeautifulSoup(html, "html.parser").get_text(" ", strip=True)
        new_ph = [p for p in extract_phones(text) if p not in phones]
        new_em = [e for e in extract_emails(text, host) if e not in emails]
        new_so = [s for s in extract_socials(html) if s not in socials]
        if new_ph or new_em or new_so:
            sources.append(url)
        phones += new_ph
        emails += new_em
        socials += new_so
        time.sleep(0.5)

    if not row.get("Телефон") and phones:
        row["Телефон"] = phones[0]
    if not row.get("Email") and emails:
        row["Email"] = emails[0]
    if not row.get("Соцсети") and socials:
        row["Соцсети"] = " | ".join(socials[:3])

    has_phone, has_email = bool(row.get("Телефон")), bool(row.get("Email"))
    if has_phone and has_email:
        status = "собран"
    elif has_phone or has_email or row.get("Соцсети"):
        status = "частично"
    else:
        status = "не найден"
    return row, status, sources[0] if sources else ""


def main():
    ap = argparse.ArgumentParser(description="Сбор публичных контактов компаний.")
    ap.add_argument("--input", default="../companies-base.csv")
    ap.add_argument("--output", default="../companies-base-enriched.csv")
    ap.add_argument("--delay", type=float, default=3.0, help="пауза между компаниями, с")
    ap.add_argument("--timeout", type=int, default=20)
    ap.add_argument("--limit", type=int, default=0, help="обработать не больше N (0 = все)")
    ap.add_argument("--priority", default="", help="фильтр приоритета: A или B")
    args = ap.parse_args()

    with open(args.input, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if not rows:
        sys.exit("Пустой входной файл")

    fieldnames = list(rows[0].keys())
    for col in ("Источник", "Дата_сбора"):
        if col not in fieldnames:
            fieldnames.append(col)

    session = requests.Session()
    today = date.today().isoformat()
    done = 0

    for row in rows:
        if args.priority and row.get("Приоритет", "") != args.priority:
            continue
        if row.get("Статус") in ("собран", "частично"):
            print(f"= пропуск (уже есть): {row['Компания']}")
            continue
        if args.limit and done >= args.limit:
            break

        row, status, source = process_company(session, row, args.timeout)
        row["Статус"] = status
        row["Источник"] = source
        row["Дата_сбора"] = today
        done += 1
        print(f"[{done}] {row['Компания']:35.35} -> {status:10} "
              f"тел={row.get('Телефон','') or '-'}  email={row.get('Email','') or '-'}")
        time.sleep(args.delay)

    with open(args.output, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for row in rows:
            w.writerow({k: row.get(k, "") for k in fieldnames})

    print(f"\nГотово. Обработано: {done}. Результат: {args.output}")


if __name__ == "__main__":
    main()
