import type { ESIMPlan } from "@/types/esim";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, CalendarDays, DownloadCloud, Globe, ShoppingCart } from 'lucide-react';

interface PlanCardProps {
  plan: ESIMPlan;
  onPurchase: (planId: string) => void;
}

export function PlanCard({ plan, onPurchase }: PlanCardProps) {
  return (
    <Card className="flex flex-col justify-between animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-xl flex items-center">
             <span className="text-2xl mr-2">{plan.flag}</span> {plan.country}
          </CardTitle>
           <span className="text-lg font-semibold text-primary">${plan.price.toFixed(2)}</span>
        </div>
        <CardDescription>{plan.planName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <DownloadCloud className="w-4 h-4 mr-2 text-primary" /> {plan.dataAmountGB} GB Data
        </div>
        <div className="flex items-center text-sm">
          <CalendarDays className="w-4 h-4 mr-2 text-primary" /> Valid for {plan.validityDays} days
        </div>
        {plan.networkCoverage && plan.networkCoverage.length > 0 && (
           <div className="flex items-start text-sm">
             <Wifi className="w-4 h-4 mr-2 mt-0.5 text-primary shrink-0" /> 
             <div>
                Networks: {plan.networkCoverage.join(', ')}
             </div>
           </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onPurchase(plan.id)}>
          <ShoppingCart className="w-4 h-4 mr-2" /> Purchase Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
