
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { TopUpModal } from '@/components/billing/top-up-modal';
import { useToast } from "@/hooks/use-toast";

interface BalanceContextType {
  balance: number;
  topUpBalance: (amount: number, paymentMethod: string) => void;
  deductBalance: (amount: number) => boolean;
  isTopUpModalOpen: boolean;
  openTopUpModal: () => void;
  closeTopUpModal: () => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Initial balance for demo purposes
const INITIAL_BALANCE = 20; 

const paymentMethodLabels: Record<string, string> = {
  card: "Credit/Debit Card",
  crypto: "Cryptocurrency",
  stars: "Stars",
};

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const { toast } = useToast();

  const topUpBalance = useCallback((amount: number, paymentMethod: string) => {
    setBalance((prevBalance) => prevBalance + amount);
    const methodLabel = paymentMethodLabels[paymentMethod] || "Selected Method";
    toast({
      title: "Top Up Successful (Demo)",
      description: `Successfully added $${amount.toFixed(2)} using ${methodLabel}. New balance: $${(balance + amount).toFixed(2)}`,
    });
    setIsTopUpModalOpen(false);
  }, [toast, balance]);

  const deductBalance = useCallback((amount: number) => {
    if (balance >= amount) {
      setBalance((prevBalance) => prevBalance - amount);
      return true;
    }
    return false;
  }, [balance]);

  const openTopUpModal = useCallback(() => {
    setIsTopUpModalOpen(true);
  }, []);

  const closeTopUpModal = useCallback(() => {
    setIsTopUpModalOpen(false);
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        topUpBalance,
        deductBalance,
        isTopUpModalOpen,
        openTopUpModal,
        closeTopUpModal,
      }}
    >
      {children}
      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={closeTopUpModal}
        onConfirmTopUp={topUpBalance}
      />
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
}
