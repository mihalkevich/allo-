
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { SmsPanel } from "@/components/sms/sms-panel";
import { EsimPanel } from "@/components/esim/esim-panel";
// import { DashboardOverview } from "@/components/dashboard/dashboard-overview"; // Removed
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ServiceType = "sms" | "esim"; // Removed "dashboard"

export default function DashboardPage() {
  const [activeService, setActiveService] = useState<ServiceType>("sms"); // Default to SMS

  const renderContent = () => {
    switch (activeService) {
      case "sms":
        return <SmsPanel />;
      case "esim":
        return <EsimPanel />;
      default:
        // setActiveService is no longer needed for DashboardOverview
        return <SmsPanel />; // Fallback to SMS if something unexpected happens
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      
      <div className="container pt-4 pb-2 px-4 sm:px-6 lg:px-8 border-b"> {/* Added horizontal padding */}
        <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-12 sm:h-auto"> {/* Changed grid-cols-3 to grid-cols-2 */}
            {/* <TabsTrigger value="dashboard" className="text-base py-2.5 sm:py-2">Dashboard</TabsTrigger> */} {/* Removed Dashboard tab */}
            <TabsTrigger value="sms" className="text-base py-2.5 sm:py-2">SMS</TabsTrigger>
            <TabsTrigger value="esim" className="text-base py-2.5 sm:py-2">eSIM</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="container py-5 md:py-8 px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding */}
          {renderContent()}
        </div>
      </ScrollArea>
    </div>
  );
}
