
"use client";

import type { LeasedSMSNumber } from "@/types/sms";
import { NumberCard } from "./number-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface MyNumbersListProps {
  numbers: LeasedSMSNumber[];
  onSelectNumber: (number: LeasedSMSNumber) => void;
  selectedNumberId?: string;
  onRenewNumber: (numberId: string, duration: number) => void;
  onUpdateNumberComment: (numberId: string, comment: string) => void;
  onToggleNumberAutoRenew: (numberId: string, autoRenew: boolean) => void;
}

export function MyNumbersList({ 
  numbers, 
  onSelectNumber, 
  selectedNumberId,
  onRenewNumber,
  onUpdateNumberComment,
  onToggleNumberAutoRenew
}: MyNumbersListProps) {

  if (numbers.length === 0) {
    return (
       <Alert className="max-w-md mx-auto">
          <Info className="h-4 w-4" />
          <AlertTitle>No Leased Numbers</AlertTitle>
          <AlertDescription>
            You currently don&apos;t have any leased SMS numbers. Visit the &quot;Available Numbers&quot; section to get started.
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
            onRenew={onRenewNumber}
            onUpdateComment={onUpdateNumberComment}
            onToggleAutoRenew={onToggleNumberAutoRenew}
            onViewMessages={() => onSelectNumber(number)}
            isCardSelected={number.id === selectedNumberId}
          />
        ))}
      </div>
    </div>
  );
}
