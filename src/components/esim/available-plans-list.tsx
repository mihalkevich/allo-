
"use client";

import type { ESIMPlan } from "@/types/esim";
import { PlanCard } from "./plan-card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useBalance } from "@/contexts/balance-context"; // Import useBalance

interface AvailablePlansListProps {
  plans: ESIMPlan[];
}

export function AvailablePlansList({ plans: initialPlans }: AvailablePlansListProps) {
  const { toast } = useToast();
  const { balance, deductBalance, openTopUpModal } = useBalance(); // Use balance context
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const handlePurchase = (planId: string) => {
    const planToPurchase = initialPlans.find(p => p.id === planId);
    if (!planToPurchase) return;

    const purchasePrice = planToPurchase.price;

    if (deductBalance(purchasePrice)) {
      toast({
        title: "Purchase Successful (Demo)",
        description: `Purchased ${planToPurchase.planName} for ${planToPurchase.country} at $${purchasePrice.toFixed(2)}. New balance: $${(balance - purchasePrice).toFixed(2)}`,
      });
      console.log(`Purchase plan ${planId}. Price: $${purchasePrice.toFixed(2)}`);
      // In a real app, update active subscriptions or trigger a refetch
    } else {
      toast({
        title: "Insufficient Funds",
        description: `Your balance of $${balance.toFixed(2)} is not enough to purchase this plan for $${purchasePrice.toFixed(2)}. Please top up.`,
        variant: "destructive",
      });
      openTopUpModal();
    }
  };

  const uniqueCountries = ["all", ...new Set(initialPlans.map(plan => plan.country))];

  const filteredPlans = initialPlans
    .filter(plan => selectedCountry === "all" || plan.country === selectedCountry)
    .filter(plan => 
      plan.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6 p-1">
       <div className="flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search by country or plan name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by country" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCountries.map(country => (
              <SelectItem key={country} value={country}>
                {country === "all" ? "All Countries" : country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filteredPlans.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No plans match your criteria.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {filteredPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onPurchase={handlePurchase} />
        ))}
      </div>
    </div>
  );
}
