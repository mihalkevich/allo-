
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "@/components/icons/star-icon";

interface TestimonialCardProps {
  name: string;
  rating: number;
  title: string;
  text: string;
  avatarUrl?: string;
  avatarFallback: string;
}

export function TestimonialCard({ name, rating, title, text, avatarUrl, avatarFallback }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground">{name}</p>
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="mb-2 text-md font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
}
