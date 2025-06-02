
import type { ReactNode } from 'react';

interface SmsFeatureItemProps {
  icon: ReactNode;
  subTitle: string;
  title: string;
  description: string;
}

export function SmsFeatureItem({ icon, subTitle, title, description }: SmsFeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-muted-foreground">{subTitle}</h3>
      <h4 className="mb-2 text-xl font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground max-w-xs">
        {description}
      </p>
    </div>
  );
}
