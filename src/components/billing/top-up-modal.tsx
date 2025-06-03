
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
import { DollarSign, CreditCard, CircleDollarSign, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmTopUp: (amount: number, paymentMethod: string) => void;
}

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="mr-2 h-5 w-5" /> },
  { id: 'crypto', label: 'Cryptocurrency', icon: <CircleDollarSign className="mr-2 h-5 w-5" /> },
  { id: 'stars', label: 'Stars', icon: <Star className="mr-2 h-5 w-5" /> },
];

export function TopUpModal({ isOpen, onClose, onConfirmTopUp }: TopUpModalProps) {
  const [amount, setAmount] = useState<string>("10");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(paymentMethods[0].id);
  const { toast } = useToast();

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
    if (!selectedPaymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      });
      return;
    }
    onConfirmTopUp(numericAmount, selectedPaymentMethod);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Top Up Your Balance
          </DialogTitle>
          <DialogDescription>
            Select an amount and payment method to add to your account balance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-2">
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

          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="gap-3">
              {paymentMethods.map((method) => (
                <Label
                  key={method.id}
                  htmlFor={`payment-${method.id}`}
                  className="flex items-center space-x-3 rounded-md border border-muted p-3 hover:border-primary transition-colors cursor-pointer has-[input:checked]:border-primary has-[input:checked]:ring-1 has-[input:checked]:ring-primary"
                >
                  <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                  {method.icon}
                  <span>{method.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className="sm:justify-start pt-2">
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
