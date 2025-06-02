
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

interface CountryFlagGridSelectorProps {
  countries: CountryOption[];
  selectedCountry: string;
  onSelectCountry: (countryCode: string) => void;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

export function CountryFlagGridSelector({
  countries,
  selectedCountry,
  onSelectCountry,
  showAllOption = true,
  allOptionLabel = "All Countries",
}: CountryFlagGridSelectorProps) {
  return (
    <div className="space-y-4 mb-6">
      {showAllOption && (
        <Button
          variant={selectedCountry === "all" ? "default" : "outline"}
          onClick={() => onSelectCountry("all")}
          className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
        >
          {allOptionLabel}
        </Button>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {countries.map((country) => (
          <Card
            key={country.code}
            onClick={() => onSelectCountry(country.code)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              selectedCountry === country.code
                ? "ring-2 ring-primary shadow-xl scale-105"
                : "hover:border-primary/50 shadow-md"
            )}
          >
            <CardContent className="flex flex-col items-center justify-center p-3 text-center aspect-[3/2] sm:aspect-square">
              <span className="text-3xl mb-1.5 sm:text-4xl">{country.flag}</span>
              <p className="text-xs font-medium truncate w-full">{country.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
