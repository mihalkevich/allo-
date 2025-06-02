
"use client";

import type { AvailableSMSNumber } from "@/types/sms";
import { NumberCard } from "./number-card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBalance } from "@/contexts/balance-context"; // Import useBalance

interface AvailableNumbersListProps {
  numbers: AvailableSMSNumber[];
}

export function AvailableNumbersList({ numbers: initialNumbers }: AvailableNumbersListProps) {
  const { toast } = useToast();
  const { balance, deductBalance, openTopUpModal } = useBalance(); // Use balance context
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const handleLease = (numberId: string, duration: number) => {
    const numberToLease = initialNumbers.find(n => n.id === numberId);
    if (!numberToLease) return;

    const leasePrice = numberToLease.pricePerMonth * duration; // Assuming duration is in months

    if (deductBalance(leasePrice)) {
      toast({
        title: "Lease Successful (Demo)",
        description: `Leasing ${numberToLease.phoneNumber} for ${duration} month(s) at $${leasePrice.toFixed(2)}. New balance: $${(balance - leasePrice).toFixed(2)}`,
      });
      console.log(`Lease number ${numberId} for ${duration} months. Price: $${leasePrice.toFixed(2)}`);
      // In a real app, update leased numbers list or trigger a refetch
    } else {
      toast({
        title: "Insufficient Funds",
        description: `Your balance of $${balance.toFixed(2)} is not enough to lease this number for $${leasePrice.toFixed(2)}. Please top up.`,
        variant: "destructive",
      });
      openTopUpModal();
    }
  };
  
  const uniqueCountries = ["all", ...new Set(initialNumbers.map(num => num.country))];

  const filteredNumbers = initialNumbers
    .filter(num => selectedCountry === "all" || num.country === selectedCountry)
    .filter(num => 
      num.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      num.phoneNumber.includes(searchTerm)
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search by country or phone number..."
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
      {filteredNumbers.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No numbers match your criteria.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {filteredNumbers.map((number) => (
          <NumberCard key={number.id} number={number} onLease={handleLease} />
        ))}
      </div>
    </div>
  );
}
