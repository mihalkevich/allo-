
import type { ReactNode } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { AlloLogo } from '@/components/icons/allo-logo';
import { Button } from '@/components/ui/button';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-secondary p-4 sm:p-6 md:p-8">
      <Link href="/" passHref legacyBehavior>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-muted-foreground hover:text-foreground">
          <X className="h-6 w-6" />
          <span className="sr-only">Close and go to homepage</span>
        </Button>
      </Link>
      <div className="mb-8">
        <AlloLogo />
      </div>
      <main className="w-full max-w-md animate-fade-in">
        {children}
      </main>
    </div>
  );
}
