
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { SmsPanel } from "@/components/sms/sms-panel";
import { EsimPanel } from "@/components/esim/esim-panel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ServiceType = "sms" | "esim";

export default function DashboardPage() {
  const [activeService, setActiveService] = useState<ServiceType>("sms"); 

  const renderContent = () => {
    switch (activeService) {
      case "sms":
        return <SmsPanel />;
      case "esim":
        return <EsimPanel />;
      default:
        return <SmsPanel />; 
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      
      <div className="container pt-4 pb-3 px-4 sm:px-6 lg:px-8 border-b">
        <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-11 rounded-lg p-1 bg-muted sm:max-w-xs sm:mx-auto">
            <TabsTrigger 
              value="sms" 
              className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md py-2 sm:py-1.5"
            >
              SMS
            </TabsTrigger>
            <TabsTrigger 
              value="esim" 
              className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md py-2 sm:py-1.5"
            >
              eSIM
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="container py-6 md:py-8 px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </ScrollArea>
    </div>
  );
}

