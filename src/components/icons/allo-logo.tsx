import type { SVGProps } from 'react';

export function AlloLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="80"
      height="32"
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Allo Services Logo"
      {...props}
    >
      <rect width="80" height="32" rx="6" fill="hsl(var(--primary))" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Roboto, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
        className="font-headline"
      >
        Allo
      </text>
    </svg>
  );
}
