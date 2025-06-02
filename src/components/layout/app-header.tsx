"use client";

import type { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { AlloLogo } from '@/components/icons/allo-logo';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ServiceType = "sms" | "esim" | "dashboard";

interface AppHeaderProps {
  activeService: ServiceType;
  setActiveService: Dispatch<SetStateAction<ServiceType>>;
}

export function AppHeader({ activeService, setActiveService }: AppHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Placeholder for Firebase logout
    console.log("User logged out");
    router.push('/login');
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <AlloLogo />
        </Link>
        
        <div className="flex-1 flex justify-center">
          <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
              <TabsTrigger value="esim">eSIM</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
       {/* Mobile navigation tabs */}
       <div className="md:hidden border-t">
          <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none h-12">
              <TabsTrigger value="dashboard" className="rounded-none">Dashboard</TabsTrigger>
              <TabsTrigger value="sms" className="rounded-none">SMS</TabsTrigger>
              <TabsTrigger value="esim" className="rounded-none">eSIM</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
    </header>
  );
}
