
import type { AvailableSMSNumber, LeasedSMSNumber } from "@/types/sms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, CalendarDays, MessageSquare, Save, RotateCcw, ShoppingCart } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { cn } from "@/lib/utils";

interface NumberCardProps {
  number: AvailableSMSNumber | LeasedSMSNumber;
  onLease?: (numberId: string, duration: number) => void;
  onRenew?: (numberId: string, duration: number) => void;
  onUpdateComment?: (numberId: string, comment: string) => void;
  onToggleAutoRenew?: (numberId: string, autoRenew: boolean) => void;
  onViewMessages?: (number: LeasedSMSNumber) => void;
  isCardSelected?: boolean;
}

export function NumberCard({ 
  number, 
  onLease, 
  onRenew, 
  onUpdateComment, 
  onToggleAutoRenew, 
  onViewMessages,
  isCardSelected 
}: NumberCardProps) {
  const isLeased = 'leasedUntil' in number;

  const handleCommentSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onUpdateComment && isLeased) {
      const formData = new FormData(event.currentTarget);
      const comment = formData.get('comment') as string;
      onUpdateComment(number.id, comment);
    }
  };

  const cardAction = isLeased && onViewMessages 
    ? () => onViewMessages(number as LeasedSMSNumber) 
    : undefined;

  return (
    <Card 
      className={cn(
        "flex flex-col justify-between animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300",
        isCardSelected && "ring-2 ring-primary shadow-2xl scale-[1.01]",
        cardAction && "cursor-pointer"
      )}
      onClick={cardAction}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-xl flex items-center">
            <span className="text-2xl mr-2">{number.flag}</span> {number.country}
          </CardTitle>
          <Badge variant={isLeased ? "default" : "secondary"}>{isLeased ? "Leased" : "Available"}</Badge>
        </div>
        <CardDescription className="flex items-center pt-1">
          <Phone className="w-4 h-4 mr-2" /> {number.phoneNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-lg font-semibold text-primary">${number.pricePerMonth.toFixed(2)} / month</p>
        {isLeased && (
          <>
            <div className="text-sm text-muted-foreground flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              Leased until: {formatDistanceToNow(parseISO((number as LeasedSMSNumber).leasedUntil), { addSuffix: true })}
            </div>
            {/* Last activity removed from here */}
            <form onSubmit={handleCommentSave} onClick={(e) => e.stopPropagation()} className="space-y-2 pt-2">
              <Label htmlFor={`comment-${number.id}`}>Comment</Label>
              <div className="flex items-center space-x-2">
                <Textarea 
                  id={`comment-${number.id}`} 
                  name="comment"
                  defaultValue={(number as LeasedSMSNumber).comment || ""} 
                  placeholder="Add a note..."
                  rows={2}
                  className="flex-grow"
                />
                <Button type="submit" size="icon" variant="outline" aria-label="Save comment">
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-between pt-2" onClick={(e) => e.stopPropagation()}>
              <Label htmlFor={`autorenew-${number.id}`} className="flex items-center space-x-2 cursor-pointer">
                <Switch 
                  id={`autorenew-${number.id}`} 
                  checked={(number as LeasedSMSNumber).autoRenew}
                  onCheckedChange={(checked) => onToggleAutoRenew?.(number.id, checked)}
                />
                <span>Auto-renew</span>
              </Label>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter onClick={(e) => e.stopPropagation()}>
        {isLeased ? (
          <Button className="w-full" onClick={() => onRenew?.(number.id, 1 /* Default renew duration */)}>
            <RotateCcw className="w-4 h-4 mr-2" /> Renew Lease
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onLease?.(number.id, (number.leaseDurationOptions[0] || 1))}>
            <ShoppingCart className="w-4 h-4 mr-2" /> Lease Number
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
