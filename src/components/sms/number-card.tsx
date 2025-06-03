
import type { AvailableSMSNumber, LeasedSMSNumber } from "@/types/sms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, CalendarDays, Save, RotateCcw, ShoppingCart } from 'lucide-react';
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
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-lg flex items-center"> {/* Adjusted text size */}
            <span className="text-2xl mr-2">{number.flag}</span> {number.country}
          </CardTitle>
          <Badge variant={isLeased ? "default" : "secondary"}>{isLeased ? "Leased" : "Available"}</Badge>
        </div>
        <CardDescription className="flex items-center pt-1 text-sm"> {/* Adjusted text size */}
          <Phone className="w-4 h-4 mr-2" /> {number.phoneNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0">
        <p className="text-md font-semibold text-primary">${number.pricePerMonth.toFixed(2)} / month</p> {/* Adjusted text size */}
        {isLeased && (
          <>
            <div className="text-xs text-muted-foreground flex items-center"> {/* Adjusted text size */}
              <CalendarDays className="w-3 h-3 mr-2" /> {/* Adjusted icon size */}
              Leased until: {formatDistanceToNow(parseISO((number as LeasedSMSNumber).leasedUntil), { addSuffix: true })}
            </div>
            <form onSubmit={handleCommentSave} onClick={(e) => e.stopPropagation()} className="space-y-1 pt-1"> {/* Adjusted spacing */}
              <Label htmlFor={`comment-${number.id}`} className="text-xs">Comment</Label> {/* Adjusted text size */}
              <div className="flex items-center space-x-2">
                <Textarea 
                  id={`comment-${number.id}`} 
                  name="comment"
                  defaultValue={(number as LeasedSMSNumber).comment || ""} 
                  placeholder="Add a note..."
                  rows={2}
                  className="flex-grow text-xs" /* Adjusted text size */
                />
                <Button type="submit" size="icon" variant="outline" aria-label="Save comment" className="h-7 w-7"> {/* Adjusted size */}
                  <Save className="w-3 h-3" /> {/* Adjusted icon size */}
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}> {/* Adjusted spacing */}
              <Label htmlFor={`autorenew-${number.id}`} className="flex items-center space-x-2 cursor-pointer text-xs"> {/* Adjusted text size */}
                <Switch 
                  id={`autorenew-${number.id}`} 
                  checked={(number as LeasedSMSNumber).autoRenew}
                  onCheckedChange={(checked) => onToggleAutoRenew?.(number.id, checked)}
                  className="data-[state=checked]:h-5 data-[state=unchecked]:h-5 w-9 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 thumb:h-4 thumb:w-4" /* Custom small switch */
                />
                <span>Auto-renew</span>
              </Label>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0" onClick={(e) => e.stopPropagation()}>
        {isLeased ? (
          <Button size="sm" className="w-full text-xs" onClick={() => onRenew?.(number.id, 1 /* Default renew duration */)}> {/* Adjusted size & text */}
            <RotateCcw className="w-3 h-3 mr-1.5" /> Renew Lease {/* Adjusted icon size */}
          </Button>
        ) : (
          <Button size="sm" className="w-full text-xs" onClick={() => onLease?.(number.id, (number.leaseDurationOptions[0] || 1))}> {/* Adjusted size & text */}
            <ShoppingCart className="w-3 h-3 mr-1.5" /> Lease Number {/* Adjusted icon size */}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
