import type { ActiveESIMSubscription } from "@/types/esim";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QrCode, CalendarOff, BarChart3, Info, DownloadCloud } from 'lucide-react';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface ActiveSubscriptionCardProps {
  subscription: ActiveESIMSubscription;
}

export function ActiveSubscriptionCard({ subscription }: ActiveSubscriptionCardProps) {
  const dataUsedPercentage = (subscription.dataUsedGB / subscription.plan.dataAmountGB) * 100;

  return (
    <Card className="animate-fade-in shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-xl flex items-center">
            <span className="text-2xl mr-2">{subscription.plan.flag}</span> {subscription.plan.country} - {subscription.plan.planName}
          </CardTitle>
          <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'} className="capitalize">
             {subscription.status}
          </Badge>
        </div>
         <CardDescription>
            Activated: {format(parseISO(subscription.activationDate), "MMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="text-muted-foreground flex items-center"><DownloadCloud className="w-4 h-4 mr-1.5"/>Data Usage</span>
            <span>
              {subscription.dataRemainingGB.toFixed(2)} GB remaining / {subscription.plan.dataAmountGB} GB total
            </span>
          </div>
          <Progress value={dataUsedPercentage} aria-label={`${dataUsedPercentage.toFixed(0)}% data used`} />
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center">
          <CalendarOff className="w-4 h-4 mr-2" />
          Expires: {format(parseISO(subscription.expiryDate), "MMM d, yyyy")} ({formatDistanceToNow(parseISO(subscription.expiryDate), { addSuffix: true })})
        </div>

        <div className="flex flex-col items-center pt-4 space-y-2">
            <p className="text-sm font-medium">Scan QR Code to activate/manage eSIM:</p>
            <Image 
                src={subscription.qrCodeUrl} 
                alt="eSIM QR Code" 
                width={150} 
                height={150} 
                className="rounded-md border"
                data-ai-hint="qr code"
            />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Info className="w-4 h-4 mr-2" /> View Details / Manage
        </Button>
      </CardFooter>
    </Card>
  );
}
