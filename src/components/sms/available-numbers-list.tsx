"use client";

import type { AvailableSMSNumber } from "@/types/sms";
import { NumberCard } from "./number-card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AvailableNumbersListProps {
  numbers: AvailableSMSNumber[];
}

export function AvailableNumbersList({ numbers: initialNumbers }: AvailableNumbersListProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const handleLease = (numberId: string, duration: number) => {
    const number = initialNumbers.find(n => n.id === numberId);
    toast({
      title: "Lease Requested (Demo)",
      description: `Leasing ${number?.phoneNumber} for ${duration} month(s).`,
    });
    console.log(`Lease number ${numberId} for ${duration} months`);
  };
  
  const uniqueCountries = ["all", ...new Set(initialNumbers.map(num => num.country))];

  const filteredNumbers = initialNumbers
    .filter(num => selectedCountry === "all" || num.country === selectedCountry)
    .filter(num => 
      num.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      num.phoneNumber.includes(searchTerm)
    );

  return (
    <div className="space-y-6 p-1">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8"> {/* 32px gap is gap-8 (8 * 4px) */}
        {filteredNumbers.map((number) => (
          <NumberCard key={number.id} number={number} onLease={handleLease} />
        ))}
      </div>
    </div>
  );
}
