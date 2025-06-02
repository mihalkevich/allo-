
"use client";

import type { ESIMPlan } from "@/types/esim";
import { PlanCard } from "./plan-card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { useBalance } from "@/contexts/balance-context";
import { CountryFlagGridSelector, type CountryOption } from "@/components/shared/country-flag-grid-selector";

interface AvailablePlansListProps {
  plans: ESIMPlan[];
}

export function AvailablePlansList({ plans: initialPlans }: AvailablePlansListProps) {
  const { toast } = useToast();
  const { balance, deductBalance, openTopUpModal } = useBalance();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("all");

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

  const uniqueCountryOptions = useMemo(() => {
    const countryDataMap = new Map<string, CountryOption>();
    initialPlans.forEach(plan => {
      // For eSIM, 'countryCode' might be less straightforward if a plan covers multiple countries (e.g., "Europe").
      // We'll use plan.countryCode if available, otherwise a simplified code or plan.country itself.
      // For simplicity, we use plan.countryCode directly and assume it's unique enough for filtering.
      // If a plan is "Europe Zone 1" with code "EU", it will appear as one "country".
      const code = plan.countryCode || plan.country.replace(/\s+/g, '-').toLowerCase();
      if (!countryDataMap.has(code)) {
        countryDataMap.set(code, { code: code, name: plan.country, flag: plan.flag });
      }
    });
    return Array.from(countryDataMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [initialPlans]);


  const filteredPlans = useMemo(() => {
    return initialPlans
    .filter(plan => {
        const planCode = plan.countryCode || plan.country.replace(/\s+/g, '-').toLowerCase();
        return selectedCountryCode === "all" || planCode === selectedCountryCode;
    })
    .filter(plan => 
      plan.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialPlans, selectedCountryCode, searchTerm]);


  return (
    <div className="space-y-6 p-1">
       <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input 
          placeholder="Search by country or plan name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <CountryFlagGridSelector
        countries={uniqueCountryOptions}
        selectedCountry={selectedCountryCode}
        onSelectCountry={setSelectedCountryCode}
      />
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
