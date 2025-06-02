
"use client";

import type { AvailableSMSNumber } from "@/types/sms";
import { NumberCard } from "./number-card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { useBalance } from "@/contexts/balance-context";
import { CountryFlagGridSelector, type CountryOption } from "@/components/shared/country-flag-grid-selector";
import { Button } from "@/components/ui/button"; // Added Button import
import { ChevronDown, ChevronUp } from "lucide-react"; // Added icon imports

interface AvailableNumbersListProps {
  numbers: AvailableSMSNumber[];
  onConfirmLease: (numberId: string, duration: number) => void;
}

const INITIAL_DISPLAY_COUNT = 4;

export function AvailableNumbersList({ numbers: initialNumbers, onConfirmLease }: AvailableNumbersListProps) {
  const { toast } = useToast();
  const { balance, deductBalance, openTopUpModal } = useBalance();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("all");
  const [showAllNumbers, setShowAllNumbers] = useState(false);

  const handleAttemptLease = (numberId: string, duration: number) => {
    const numberToLease = initialNumbers.find(n => n.id === numberId);
    if (!numberToLease) return;

    const leasePrice = numberToLease.pricePerMonth * duration;

    if (deductBalance(leasePrice)) {
      onConfirmLease(numberId, duration);
    } else {
      toast({
        title: "Insufficient Funds",
        description: `Your balance of $${balance.toFixed(2)} is not enough to lease this number for $${leasePrice.toFixed(2)}. Please top up.`,
        variant: "destructive",
      });
      openTopUpModal();
    }
  };
  
  const uniqueCountryOptions = useMemo(() => {
    const countryDataMap = new Map<string, CountryOption>();
    initialNumbers.forEach(num => {
      if (!countryDataMap.has(num.countryCode)) {
        countryDataMap.set(num.countryCode, { code: num.countryCode, name: num.country, flag: num.flag });
      }
    });
    return Array.from(countryDataMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [initialNumbers]);

  const baseFilteredNumbers = useMemo(() => {
    return initialNumbers
      .filter(num => selectedCountryCode === "all" || num.countryCode === selectedCountryCode)
      .filter(num => 
        num.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        num.phoneNumber.includes(searchTerm)
      );
  }, [initialNumbers, selectedCountryCode, searchTerm]);

  const numbersToDisplay = useMemo(() => {
    if (showAllNumbers) {
      return baseFilteredNumbers;
    }
    return baseFilteredNumbers.slice(0, INITIAL_DISPLAY_COUNT);
  }, [baseFilteredNumbers, showAllNumbers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input 
          placeholder="Search by country or phone number..."
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
      {numbersToDisplay.length === 0 && baseFilteredNumbers.length === 0 && ( // Check baseFilteredNumbers too for more accurate "no results"
        <p className="text-center text-muted-foreground py-8">No numbers match your criteria.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {numbersToDisplay.map((number) => (
          <NumberCard 
            key={number.id} 
            number={number} 
            onLease={handleAttemptLease}
          />
        ))}
      </div>
      {baseFilteredNumbers.length > INITIAL_DISPLAY_COUNT && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllNumbers(!showAllNumbers)}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            {showAllNumbers ? "Show Fewer Numbers" : `Show All ${baseFilteredNumbers.length} Numbers`}
            {showAllNumbers ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      )}
       {numbersToDisplay.length === 0 && baseFilteredNumbers.length > 0 && (
         <p className="text-center text-muted-foreground py-8">
           All matching numbers are hidden. Click "Show All {baseFilteredNumbers.length} Numbers" to see them.
         </p>
       )}
    </div>
  );
}
