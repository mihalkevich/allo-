"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailablePlansList } from "./available-plans-list";
import { ActiveSubscriptionCard } from "./active-subscription-card";
import { mockESIMPlans, mockActiveSubscriptions } from "@/data/mock-esim";
import { Wifi, ListChecks, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function EsimPanel() {
  // In a real app, this data would be fetched.
  const plans = mockESIMPlans;
  const activeSubscriptions = mockActiveSubscriptions;

  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="available-plans" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-6">
          <TabsTrigger value="available-plans" className="py-3 text-base">
            <Search className="w-5 h-5 mr-2" /> Available Plans
          </TabsTrigger>
          <TabsTrigger value="my-subscriptions" className="py-3 text-base">
            <ListChecks className="w-5 h-5 mr-2" /> My Subscriptions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="available-plans">
          <AvailablePlansList plans={plans} />
        </TabsContent>
        <TabsContent value="my-subscriptions">
          {activeSubscriptions.length === 0 ? (
            <Alert className="max-w-md mx-auto">
              <Info className="h-4 w-4" />
              <AlertTitle>No Active Subscriptions</AlertTitle>
              <AlertDescription>
                You currently don&apos;t have any active eSIM subscriptions. Browse available plans to get started.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-8"> {/* 32px gap */}
              {activeSubscriptions.map((sub) => (
                <ActiveSubscriptionCard key={sub.id} subscription={sub} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
