import type { ReactNode } from 'react';
import { AlloLogo } from '@/components/icons/allo-logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <AlloLogo />
      </div>
      <main className="w-full max-w-md animate-fade-in">
        {children}
      </main>
    </div>
  );
}
