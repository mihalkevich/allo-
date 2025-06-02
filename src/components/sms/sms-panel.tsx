"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableNumbersList } from "./available-numbers-list";
import { MyNumbersList } from "./my-numbers-list";
import { mockAvailableNumbers, mockLeasedNumbers } from "@/data/mock-sms";
import { ReceiptText, Search, ListChecks } from 'lucide-react';

export function SmsPanel() {
  // In a real app, this data would be fetched.
  const availableNumbers = mockAvailableNumbers;
  const leasedNumbers = mockLeasedNumbers;

  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-6">
          <TabsTrigger value="available" className="py-3 text-base">
            <Search className="w-5 h-5 mr-2" /> Available Numbers
          </TabsTrigger>
          <TabsTrigger value="my-numbers" className="py-3 text-base">
             <ListChecks className="w-5 h-5 mr-2" /> My Numbers & History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <AvailableNumbersList numbers={availableNumbers} />
        </TabsContent>
        <TabsContent value="my-numbers">
          <MyNumbersList numbers={leasedNumbers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
