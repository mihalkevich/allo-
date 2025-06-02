
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { SmsPanel } from "@/components/sms/sms-panel";
import { EsimPanel } from "@/components/esim/esim-panel";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ServiceType = "dashboard" | "sms" | "esim";

export default function DashboardPage() {
  const [activeService, setActiveService] = useState<ServiceType>("dashboard");

  const renderContent = () => {
    switch (activeService) {
      case "sms":
        return <SmsPanel />;
      case "esim":
        return <EsimPanel />;
      case "dashboard":
      default:
        // Pass setActiveService to DashboardOverview
        return <DashboardOverview setActiveService={setActiveService} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      
      <div className="container pt-4 pb-2 border-b">
        <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-12 sm:h-auto">
            <TabsTrigger value="dashboard" className="text-base py-2.5 sm:py-2">Dashboard</TabsTrigger>
            <TabsTrigger value="sms" className="text-base py-2.5 sm:py-2">SMS</TabsTrigger>
            <TabsTrigger value="esim" className="text-base py-2.5 sm:py-2">eSIM</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="container py-5 md:py-8">
          {renderContent()}
        </div>
      </ScrollArea>
    </div>
  );
}
