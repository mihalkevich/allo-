"use client";

import { useState } from "react";
import { AppHeader, type ServiceType } from "@/components/layout/app-header";
import { SmsPanel } from "@/components/sms/sms-panel";
import { EsimPanel } from "@/components/esim/esim-panel";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AppHeader activeService={activeService} setActiveService={setActiveService} />
      <ScrollArea className="flex-1">
        <div className="container py-5 md:py-8"> {/* 20px for py-5, 32px for py-8 */}
          {renderContent()}
        </div>
      </ScrollArea>
    </div>
  );
}
