
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmTopUp: (amount: number) => void; // Changed to accept amount
}

export function TopUpModal({ isOpen, onClose, onConfirmTopUp }: TopUpModalProps) {
  const [amount, setAmount] = useState<string>("10");
  const { toast } = useToast(); // Keep toast for validation messages

  const presetAmounts = [10, 20, 50, 100];

  const handleConfirm = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount to top up.",
        variant: "destructive",
      });
      return;
    }
    onConfirmTopUp(numericAmount); // Call the passed function with the amount
    // Toast for success will be handled by the BalanceContext
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Top Up Your Balance
          </DialogTitle>
          <DialogDescription>
            Select or enter an amount to add to your account balance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 25"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Or select a preset amount:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  onClick={() => setAmount(preset.toString())}
                  className={parseFloat(amount) === preset ? "ring-2 ring-primary" : ""}
                >
                  ${preset}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" onClick={handleConfirm} className="w-full sm:w-auto">
            Confirm Top Up
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
