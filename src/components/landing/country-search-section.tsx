
"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import Link from "next/link";

const popularCountries = [
  { name: "United Arab Emirates", flag: "🇦🇪", code: "ae" },
  { name: "Turkey", flag: "🇹🇷", code: "tr" },
  { name: "USA", flag: "🇺🇸", code: "us" },
];

export function CountrySearchSection() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Choose a country
        </h2>
        <div className="mx-auto max-w-xl">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Enter your country"
              className="w-full rounded-full bg-secondary py-6 pl-12 pr-4 text-base shadow-sm focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>Popular:</span>
            {popularCountries.map((country) => (
              <Link key={country.code} href="/register" className="hover:text-primary hover:underline">
                <span className="mr-1">{country.flag}</span>{country.name}
              </Link>
            ))}
          </div>
          <Tabs defaultValue="local" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-full shadow-inner bg-muted p-1.5 h-auto">
              <TabsTrigger value="local" className="rounded-full py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Local eSIM</TabsTrigger>
              <TabsTrigger value="regional" className="rounded-full py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Regional eSIM</TabsTrigger>
              <TabsTrigger value="global" className="rounded-full py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Global eSIM</TabsTrigger>
            </TabsList>
            {/* TabsContent can be added here if different content is needed per tab */}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
