
"use client";

// import type { ServiceType } from "@/app/dashboard/page"; // No longer needed here
import { SmsRentalStatusChart } from "./sms-rental-status-chart";
import { EsimUsageChart } from "./esim-usage-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartHorizontalBig, Wifi, Users, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const StatCard = ({ title, value, icon: Icon, trend, description, period }: { title: string, value: string, icon: React.ElementType, trend?: string, description?: string, period?: string}) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && <p className="text-xs text-muted-foreground flex items-center"><ArrowUpRight className="h-3 w-3 mr-1 text-green-500"/>{trend}</p>}
      {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      {period && <p className="text-xs text-muted-foreground pt-1">{period}</p>}
    </CardContent>
  </Card>
);

// setActiveService prop is removed as DashboardOverview is no longer directly controlling tabs
interface DashboardOverviewProps {
  // setActiveService: (service: ServiceType) => void; // Removed
}

export function DashboardOverview({/* setActiveService */}: DashboardOverviewProps) { // Prop removed
  const { toast } = useToast();

  const handleBillingHistory = () => {
    toast({
      title: "Billing History (Demo)",
      description: "This would navigate to the billing history page.",
    });
  };

  // Quick Action buttons will need to be handled differently if DashboardOverview is used elsewhere
  // For now, they will show toasts as they are not connected to tab switching.
  const handleLeaseSms = () => {
     toast({
      title: "Lease SMS Number (Demo)",
      description: "This would navigate to the SMS leasing section.",
    });
    // If this component were still managing tabs: setActiveService('sms');
  };

  const handlePurchaseEsim = () => {
    toast({
      title: "Purchase eSIM (Demo)",
      description: "This would navigate to the eSIM purchasing section.",
    });
    // If this component were still managing tabs: setActiveService('esim');
  };


  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active SMS Numbers" value="28" icon={BarChartHorizontalBig} trend="+5 this month" description="Total leased numbers currently active." />
        <StatCard title="Active eSIM Plans" value="12" icon={Wifi} trend="+2 this month" description="Total active eSIM subscriptions." />
        <StatCard title="Total Users" value="1,250" icon={Users} trend="+10% this month" description="Registered users on the platform." />
        <StatCard title="Revenue (This Month)" value="$1,234" icon={ArrowUpRight} trend="+15.2% from last month" description="Generated revenue from services." />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SmsRentalStatusChart />
        <EsimUsageChart />
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Quick Actions</CardTitle>
          <CardDescription>Manage your services efficiently.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" size="lg" onClick={handleLeaseSms}>Lease New SMS Number</Button>
          <Button variant="outline" size="lg" onClick={handlePurchaseEsim}>Purchase eSIM Plan</Button>
          <Button variant="outline" size="lg" onClick={handleBillingHistory}>View Billing History</Button>
        </CardContent>
      </Card>
    </div>
  );
}

