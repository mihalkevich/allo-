
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

  // Initialize selectedNumber to null
  const [selectedNumber, setSelectedNumber] = useState<LeasedSMSNumber | null>(null);
  const [messages, setMessages] = useState<SMSMessage[]>([]);

  useEffect(() => {
    if (selectedNumber) {
      const initialMessages = mockSmsMessages[selectedNumber.phoneNumber] || [];
      setMessages(initialMessages);
    } else {
      setMessages([]); // Clear messages if no number is selected
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

          // Only add message and toast if it's for the currently selected number
          setMessages((prevMessages) => {
            // Check if the message is for the currently selected number's context
            // For inbound, recipient should be selectedNumber.phoneNumber
            if (newMockMessage.recipient === selectedNumber.phoneNumber) {
                 toast({
                    title: "New SMS Received (Demo)",
                    description: `From: ${newMockMessage.sender} for ${selectedNumber.phoneNumber}`,
                 });
                return [...prevMessages, newMockMessage];
            }
            return prevMessages; // Don't add if not for current context
          });
          
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
      status: 'sent', // Initial status
    };
    setMessages(prev => [...prev, newMessage]);
    // Simulate delivery confirmation
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? {...m, status: 'delivered'} : m));
    }, 1500);
    toast({
      title: 'Message Sent (Demo)',
      description: `To: ${newMessage.recipient}, Message: ${messageContent}`,
    });
  };

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-6"> {/* Adjusted gap */}
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8"> {/* Adjusted space-y */}
        <section id="available-numbers">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 mr-2.5 text-primary" /> {/* Adjusted icon size & margin */}
            <h2 className="text-xl font-semibold tracking-tight">Available Numbers to Lease</h2> {/* Adjusted text size */}
          </div>
          <AvailableNumbersList
            numbers={allAvailableNumbers}
            onConfirmLease={handleConfirmLease}
          />
        </section>

        <section id="my-numbers">
          <div className="flex items-center mb-4">
            <PhoneOutgoing className="w-5 h-5 mr-2.5 text-primary" /> {/* Adjusted icon size & margin */}
            <h2 className="text-xl font-semibold tracking-tight">My Numbers</h2> {/* Adjusted text size */}
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
        <div className="sticky top-20"> {/* Adjusted sticky top position */}
          {selectedNumber ? (
            <SMSHistoryView
              number={selectedNumber}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="p-4">
                <CardTitle className="font-headline text-lg">Incoming Messages</CardTitle> {/* Adjusted text size */}
                <CardDescription className="text-sm">Select one of your numbers to view its messages.</CardDescription> {/* Adjusted text size */}
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-[300px] text-center p-4"> {/* Adjusted height & padding */}
                <MessagesSquare className="w-12 h-12 text-muted-foreground mb-3" /> {/* Adjusted icon size & margin */}
                <p className="text-muted-foreground text-sm">No number selected.</p> {/* Adjusted text size */}
                <p className="text-xs text-muted-foreground mt-1">Click on a number from &quot;My Numbers&quot; list to see its history here.</p> {/* Adjusted text size */}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
