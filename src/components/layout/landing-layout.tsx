
import type { ReactNode } from 'react';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';

interface LandingLayoutProps {
  children: ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}
