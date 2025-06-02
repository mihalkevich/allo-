
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ActiveServiceType } from '@/app/page';

interface HeroSectionProps {
  activeService: ActiveServiceType;
}

export function HeroSection({ activeService }: HeroSectionProps) {
  const isMobileActive = activeService === 'mobile';

  const titleContent = isMobileActive ? (
    <>
      Mobile data with{' '}
      <span
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text px-2 py-1 relative inline-block"
        style={{ filter: 'drop-shadow(0 0 0.5rem rgba(100,100,255,0.3))' }}
      >
        eSIM
      </span>
    </>
  ) : "Virtual Numbers for Global Communication";

  const descriptionContent = isMobileActive
    ? "Affordable internet access all over the world at the best prices for months. No fees & roaming charges."
    : "Get a virtual phone number for calls and SMS from anywhere in the world. Private, secure, and affordable.";

  const buttonText = isMobileActive ? "Buy Now" : "Get Virtual Number";
  const buttonLink = "/register"; // Changed to always link to /register

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 animate-fade-in">
      <div className="container text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {titleContent}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {descriptionContent}
        </p>
        <div className="mt-10">
          <Link href={buttonLink} passHref>
            <Button size="lg" className="px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-shadow">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
