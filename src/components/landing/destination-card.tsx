
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

interface DestinationCardProps {
  countryName: string;
  flagEmoji: string;
  countryCode: string;
}

export function DestinationCard({ countryName, flagEmoji, countryCode }: DestinationCardProps) {
  return (
    <Link href="/register" passHref>
      <Card className="h-full transform cursor-pointer overflow-hidden rounded-xl bg-background shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center h-full">
          <div className="mb-2 text-4xl sm:text-5xl" aria-hidden="true">
            {flagEmoji}
          </div>
          <h3 className="text-sm font-medium text-foreground sm:text-base">
            {countryName}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
