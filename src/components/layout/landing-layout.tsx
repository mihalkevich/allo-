
import type { ReactNode } from 'react';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';
import type { ActiveServiceType } from '@/app/page';

interface LandingLayoutProps {
  children: ReactNode;
  activeService: ActiveServiceType;
  setActiveService: (service: ActiveServiceType) => void;
}

export function LandingLayout({ children, activeService, setActiveService }: LandingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader activeService={activeService} setActiveService={setActiveService} />
      {children}
      <PublicFooter />
    </div>
  );
}
