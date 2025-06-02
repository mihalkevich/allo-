
"use client";

import { useState } from "react";
import type { LeasedSMSNumber, SMSMessage } from "@/types/sms";
import { mockAvailableNumbers, mockLeasedNumbers, mockSmsMessages } from "@/data/mock-sms";
import { AvailableNumbersList } from "./available-numbers-list";
import { MyNumbersList } from "./my-numbers-list";
import { SMSHistoryView } from "./sms-history-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessagesSquare, Search } from "lucide-react";

export function SmsPanel() {
  const availableNumbers = mockAvailableNumbers;
  const leasedNumbersData = mockLeasedNumbers; // Renamed to avoid conflict if we introduce fetched data

  const [selectedNumber, setSelectedNumber] = useState<LeasedSMSNumber | null>(null);
  const [messages, setMessages] = useState<SMSMessage[]>([]);

  const handleSelectLeasedNumber = (number: LeasedSMSNumber) => {
    setSelectedNumber(number);
    setMessages(mockSmsMessages[number.phoneNumber] || []);
  };

  const handleCloseHistory = () => {
    setSelectedNumber(null);
    setMessages([]);
  };

  return (
    <div className="animate-fade-in">
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl">Your SMS Service Hub</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Lease new virtual numbers, manage your current ones, and view messages all in one place.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <section id="available-numbers">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 mr-3 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">Available Numbers</h2>
            </div>
            <AvailableNumbersList numbers={availableNumbers} />
          </section>

          <section id="my-numbers">
            <div className="flex items-center mb-4">
              <MessagesSquare className="w-6 h-6 mr-3 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">My Numbers & Messages</h2>
            </div>
            <MyNumbersList
              numbers={leasedNumbersData}
              onSelectNumber={handleSelectLeasedNumber}
              selectedNumberId={selectedNumber?.id}
            />
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {selectedNumber ? (
              <SMSHistoryView
                number={selectedNumber}
                messages={messages}
                onClose={handleCloseHistory}
              />
            ) : (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline">Message History</CardTitle>
                  <CardDescription>Select one of your numbers to view its messages.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                  <MessagesSquare className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No number selected.</p>
                  <p className="text-sm text-muted-foreground mt-1">Click on a number from &quot;My Numbers&quot; list to see its history here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
