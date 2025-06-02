
"use client";

import Link from 'next/link';
// Removed useState for isTopUpModalOpen, it's now handled by BalanceContext
import { AlloLogo } from '@/components/icons/allo-logo';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { UserCircle, LogOut, Sun, Bell, Wallet, PlusCircle } from 'lucide-react';
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
// Removed TopUpModal import, it's now rendered by BalanceProvider
import { useBalance } from '@/contexts/balance-context'; // Import useBalance

export function AppHeader() {
  const router = useRouter();
  const { balance, openTopUpModal } = useBalance(); // Use balance and openTopUpModal from context

  const handleLogout = () => {
    console.log("User logged out");
    router.push('/login');
  };
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center">
              <AlloLogo />
            </Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              {/* Display dynamic balance from context */}
              <span className="text-sm font-medium">Balance: ${balance.toFixed(2)}</span> 
            </div>
            {/* Call openTopUpModal from context */}
            <Button variant="outline" size="sm" onClick={openTopUpModal}>
              <PlusCircle className="h-4 w-4 mr-1 sm:mr-2" />
              Top Up
            </Button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <Sun className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
                  <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
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
      </header>
      {/* TopUpModal is no longer rendered here; it's in BalanceProvider */}
    </>
  );
}
