
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { AlloLogo } from '@/components/icons/allo-logo';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { Button } from '@/components/ui/button';
import { Sun, Globe, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function PublicHeader() {
  const [activeService, setActiveService] = useState<'mobile' | 'virtual'>('mobile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Sign Up" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <AlloLogo />
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <Button
              variant={activeService === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveService('mobile')}
              className={cn(
                "transition-colors",
                activeService === 'mobile' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              )}
            >
              Mobile data
            </Button>
            <Button
              variant={activeService === 'virtual' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveService('virtual')}
              className={cn(
                "transition-colors",
                activeService === 'virtual' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              )}
            >
              Virtual Number
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Sun className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="mb-6 flex items-center justify-between">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <AlloLogo />
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <Button
                    variant={activeService === 'mobile' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => { setActiveService('mobile'); setIsMobileMenuOpen(false); }}
                  >
                    Mobile data
                  </Button>
                  <Button
                    variant={activeService === 'virtual' ? 'secondary' : 'ghost'}
                     className="w-full justify-start"
                    onClick={() => { setActiveService('virtual'); setIsMobileMenuOpen(false); }}
                  >
                    Virtual Number
                  </Button>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} passHref>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <div className="mt-4 flex items-center justify-start gap-2 border-t pt-4">
                     <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Sun className="h-5 w-5" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                      <LanguageSwitcher />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
