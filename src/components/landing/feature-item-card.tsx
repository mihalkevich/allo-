
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface FeatureItemCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export function FeatureItemCard({ title, description, imageUrl, imageHint }: FeatureItemCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={imageHint}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
