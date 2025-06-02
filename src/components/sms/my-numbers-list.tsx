
"use client";

import type { LeasedSMSNumber } from "@/types/sms";
import { NumberCard } from "./number-card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface MyNumbersListProps {
  numbers: LeasedSMSNumber[];
  onSelectNumber: (number: LeasedSMSNumber) => void;
  selectedNumberId?: string;
}

export function MyNumbersList({ numbers: initialNumbers, onSelectNumber, selectedNumberId }: MyNumbersListProps) {
  const { toast } = useToast();
  const [numbers, setNumbers] = useState<LeasedSMSNumber[]>(initialNumbers);

  const handleRenew = (numberId: string, duration: number) => {
    const number = numbers.find(n => n.id === numberId);
    toast({
      title: "Renew Requested (Demo)",
      description: `Renewing ${number?.phoneNumber} for ${duration} month(s).`,
    });
    console.log(`Renew number ${numberId} for ${duration} months`);
  };

  const handleUpdateComment = (numberId: string, comment: string) => {
    setNumbers(prev => prev.map(n => n.id === numberId ? { ...n, comment } : n));
    toast({
      title: "Comment Updated (Demo)",
      description: `Comment for number ${numberId} updated.`,
    });
    console.log(`Update comment for ${numberId}: ${comment}`);
  };

  const handleToggleAutoRenew = (numberId: string, autoRenew: boolean) => {
    setNumbers(prev => prev.map(n => n.id === numberId ? { ...n, autoRenew } : n));
    toast({
      title: "Auto-Renew Updated (Demo)",
      description: `Auto-renew for number ${numberId} set to ${autoRenew}.`,
    });
    console.log(`Toggle auto-renew for ${numberId} to ${autoRenew}`);
  };

  if (numbers.length === 0) {
    return (
       <Alert className="max-w-md mx-auto">
          <Info className="h-4 w-4" />
          <AlertTitle>No Leased Numbers</AlertTitle>
          <AlertDescription>
            You currently don&apos;t have any leased SMS numbers. Visit the &quot;Available Numbers&quot; section above to get started.
          </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {numbers.map((number) => (
          <NumberCard 
            key={number.id} 
            number={number} 
            onRenew={handleRenew}
            onUpdateComment={handleUpdateComment}
            onToggleAutoRenew={handleToggleAutoRenew}
            onViewMessages={() => onSelectNumber(number)}
            isCardSelected={number.id === selectedNumberId}
          />
        ))}
      </div>
    </div>
  );
}
