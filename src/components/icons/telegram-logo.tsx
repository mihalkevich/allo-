import type { SVGProps } from 'react';

// Using a simple Send icon lookalike for Telegram for now.
// A more accurate Telegram logo SVG could be used if available.
export function TelegramLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </svg>
  );
}
