
"use client";

import type { LeasedSMSNumber, SMSMessage } from "@/types/sms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Inbox, RefreshCw } from "lucide-react"; // Added RefreshCw
import { format, parseISO } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SMSHistoryViewProps {
  number: LeasedSMSNumber;
  messages: SMSMessage[];
  onSendMessage: (messageContent: string) => void;
  // onClose: () => void; // Can be removed if panel is always part of layout when number selected
}

export function SMSHistoryView({ number, messages, onSendMessage }: SMSHistoryViewProps) {
  const { toast } = useToast();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const messageContent = formData.get('messageContent') as string;
    if (messageContent.trim()) {
      onSendMessage(messageContent);
      (event.target as HTMLFormElement).reset();
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Messages Refreshed (Demo)",
      description: `Simulating refresh for ${number.phoneNumber}.`,
    });
    // In a real app, this would trigger a refetch of messages
  };

  // Helper function to get flag for a phone number (very basic, assumes US for unknown)
  const getFlagForNumber = (phoneNumber: string): string => {
    // This is a placeholder. In a real app, you might have a library or more complex logic.
    // For this demo, it will use the selected number's flag.
    // If you can derive country code from number, you can map to flag.
    if (phoneNumber === number.phoneNumber) return number.flag; // For "to" or "from" being the leased number
    return "🏳️"; // Default flag for external numbers
  };


  return (
    <div className="animate-fade-in p-1">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            {/* Spacer to balance the refresh button */}
            <div className="w-8 h-8"></div> 
            <div className="text-center flex-grow">
              <CardTitle className="font-headline text-xl">Incoming Messages</CardTitle>
              <CardDescription>{number.flag} {number.phoneNumber}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRefresh} aria-label="Refresh messages" className="h-8 w-8">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] border rounded-md p-3 mb-4"> {/* Adjusted padding */}
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => {
                  const isOutbound = msg.direction === "outbound";
                  const senderDisplay = isOutbound ? number.phoneNumber : msg.sender;
                  const recipientDisplay = isOutbound ? msg.recipient : number.phoneNumber;
                  // Basic flag logic, assumes selected number's flag for its own messages
                  const senderFlag = isOutbound ? number.flag : getFlagForNumber(msg.sender); 
                  const recipientFlag = isOutbound ? getFlagForNumber(msg.recipient) : number.flag;


                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col p-2.5 rounded-lg w-full", // Use w-full and let content determine width
                        // isOutbound ? "bg-primary text-primary-foreground self-end items-end ml-auto max-w-[85%]" : "bg-secondary text-secondary-foreground self-start items-start mr-auto max-w-[85%]"
                         isOutbound ? "bg-primary text-primary-foreground ml-auto" : "bg-muted dark:bg-secondary", // Simplified for screenshot style
                         "max-w-[85%]" // Ensure bubbles don't take full width
                      )}
                    >
                      <div className="flex justify-between items-center text-xs opacity-90 mb-1">
                        {isOutbound ? (
                            <span>to: {recipientFlag} {recipientDisplay}</span>
                        ) : (
                            <span>from: {senderFlag} {senderDisplay}</span>
                        )}
                        <span>{format(parseISO(msg.timestamp), "dd.MM")}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      {/* Optional: Status for outbound messages if needed */}
                      {isOutbound && msg.status !== 'received' && (
                        <span className="text-xs opacity-70 mt-1 self-end">{msg.status}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleFormSubmit} className="space-y-2">
            <Textarea 
              name="messageContent"
              placeholder="Type your message..."
              rows={3}
              className="resize-none"
            />
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
