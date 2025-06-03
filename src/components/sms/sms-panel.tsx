
"use client";

import { useState, useEffect } from "react";
import type { LeasedSMSNumber, SMSMessage, AvailableSMSNumber } from "@/types/sms";
import { mockAvailableNumbers, mockLeasedNumbers, mockSmsMessages } from "@/data/mock-sms";
import { AvailableNumbersList } from "./available-numbers-list";
import { MyNumbersList } from "./my-numbers-list";
import { SMSHistoryView } from "./sms-history-view";
import { MessagesSquare, Search, PhoneOutgoing } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export function SmsPanel() {
  const { toast } = useToast();
  const [allAvailableNumbers, setAllAvailableNumbers] = useState<AvailableSMSNumber[]>(mockAvailableNumbers);
  const [myLeasedNumbers, setMyLeasedNumbers] = useState<LeasedSMSNumber[]>(mockLeasedNumbers);

  const [selectedNumber, setSelectedNumber] = useState<LeasedSMSNumber | null>(() => {
    // Set the first leased number as selected by default, if available
    return mockLeasedNumbers.length > 0 ? mockLeasedNumbers[0] : null;
  });
  const [messages, setMessages] = useState<SMSMessage[]>([]);

  useEffect(() => {
    if (selectedNumber) {
      const initialMessages = mockSmsMessages[selectedNumber.phoneNumber] || [];
      setMessages(initialMessages);
    } else {
      setMessages([]);
    }
  }, [selectedNumber]);


  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (selectedNumber) {
      const simulateSms = () => {
        const randomDelay = Math.floor(Math.random() * (20000 - 12000 + 1)) + 12000; 

        intervalId = setTimeout(() => {
          const newMockMessage: SMSMessage = {
            id: `msg_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`,
            direction: "inbound",
            sender: `+1-555-${Math.floor(Math.random() * 9000000) + 1000000}`, 
            recipient: selectedNumber.phoneNumber,
            content: `Simulated message: Your Allo code is ${Math.floor(100000 + Math.random() * 900000)}. Valid for 5 mins. Received at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
            timestamp: new Date().toISOString(),
            status: "received",
          };

          setMessages((prevMessages) => [...prevMessages, newMockMessage]);
          
          // Only show toast if the message is for the currently selected number
          if (selectedNumber && newMockMessage.recipient === selectedNumber.phoneNumber) {
            toast({
              title: "New SMS Received (Demo)",
              description: `From: ${newMockMessage.sender} for ${selectedNumber.phoneNumber}`,
            });
          }
          
          if (selectedNumber) { 
             simulateSms();
          }
        }, randomDelay);
      };
      simulateSms(); 
    }

    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [selectedNumber, toast]);


  const handleSelectLeasedNumber = (number: LeasedSMSNumber) => {
    setSelectedNumber(number);
  };

  const handleCloseHistory = () => { // This function might not be used if history is always visible
    setSelectedNumber(null);
    setMessages([]);
  };

  const handleConfirmLease = (numberId: string, duration: number) => {
    const numberToLease = allAvailableNumbers.find(n => n.id === numberId);
    if (!numberToLease) {
      toast({ title: "Error", description: "Number not found.", variant: "destructive" });
      return;
    }

    const newLeasedNumber: LeasedSMSNumber = {
      ...numberToLease,
      leasedUntil: new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: false,
      comment: "",
      lastActivity: new Date().toISOString(),
    };

    setMyLeasedNumbers(prev => [newLeasedNumber, ...prev].sort((a,b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime() ));
    setAllAvailableNumbers(prev => prev.filter(n => n.id !== numberId));

    toast({
      title: "Lease Confirmed (Demo)",
      description: `${newLeasedNumber.phoneNumber} leased for ${duration} month(s). It's now in 'My Numbers'.`,
    });
  };

  const handleRenewLeasedNumber = (numberId: string, duration: number) => {
    const number = myLeasedNumbers.find(n => n.id === numberId);
    if (!number) return;
    
    setMyLeasedNumbers(prev => prev.map(n => {
      if (n.id === numberId) {
        const currentExpiry = new Date(n.leasedUntil);
        const newExpiry = new Date(currentExpiry.setMonth(currentExpiry.getMonth() + duration));
        return { ...n, leasedUntil: newExpiry.toISOString() };
      }
      return n;
    }));

    toast({
      title: "Renew Requested (Demo)",
      description: `Renewing ${number.phoneNumber} for ${duration} month(s). New expiry: ${new Date(new Date(number.leasedUntil).setMonth(new Date(number.leasedUntil).getMonth() + duration)).toLocaleDateString()}`,
    });
  };

  const handleUpdateLeasedNumberComment = (numberId: string, comment: string) => {
    setMyLeasedNumbers(prev => prev.map(n => n.id === numberId ? { ...n, comment } : n));
    const updatedNumber = myLeasedNumbers.find(n => n.id === numberId);
    toast({
      title: "Comment Updated",
      description: `Comment for ${updatedNumber?.phoneNumber} updated.`,
    });
  };

  const handleToggleLeasedNumberAutoRenew = (numberId: string, autoRenew: boolean) => {
    setMyLeasedNumbers(prev => prev.map(n => n.id === numberId ? { ...n, autoRenew } : n));
    const updatedNumber = myLeasedNumbers.find(n => n.id === numberId);
    toast({
      title: "Auto-Renew Updated",
      description: `Auto-renew for ${updatedNumber?.phoneNumber} set to ${autoRenew ? 'ON' : 'OFF'}.`,
    });
  };

  const handleSendMessage = (messageContent: string) => {
    if (!selectedNumber) return;

    const newMessage: SMSMessage = {
      id: `msg_sent_${new Date().getTime()}`,
      direction: 'outbound',
      sender: selectedNumber.phoneNumber,
      recipient: '+10000000000', // Placeholder for recipient, ideally user input
      content: messageContent,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    setMessages(prev => [...prev, newMessage]);
    toast({
      title: 'Message Sent (Demo)',
      description: `To: ${newMessage.recipient}, Message: ${messageContent}`,
    });
  };

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-10">
        <section id="available-numbers">
          <div className="flex items-center mb-4">
            <Search className="w-6 h-6 mr-3 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Available Numbers to Lease</h2>
          </div>
          <AvailableNumbersList
            numbers={allAvailableNumbers}
            onConfirmLease={handleConfirmLease}
          />
        </section>

        <section id="my-numbers">
          <div className="flex items-center mb-4">
            <PhoneOutgoing className="w-6 h-6 mr-3 text-primary" /> {/* Changed icon */}
            <h2 className="text-2xl font-semibold tracking-tight">My Numbers</h2>
          </div>
          <MyNumbersList
            numbers={myLeasedNumbers}
            onSelectNumber={handleSelectLeasedNumber}
            selectedNumberId={selectedNumber?.id}
            onRenewNumber={handleRenewLeasedNumber}
            onUpdateNumberComment={handleUpdateLeasedNumberComment}
            onToggleNumberAutoRenew={handleToggleLeasedNumberAutoRenew}
          />
        </section>
      </div>

      {/* Right Column (Sticky) */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          {selectedNumber ? (
            <SMSHistoryView
              number={selectedNumber}
              messages={messages}
              onSendMessage={handleSendMessage}
              // onClose is not strictly needed here as the panel is persistent,
              // but could be used to clear selection if a close button is added to SMSHistoryView.
              // onClose={handleCloseHistory} 
            />
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Incoming Messages</CardTitle>
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
  );
}
