
"use client";

import type { LeasedSMSNumber, SMSMessage } from "@/types/sms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, RefreshCw } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SMSHistoryViewProps {
  number: LeasedSMSNumber;
  messages: SMSMessage[];
  onSendMessage: (messageContent: string) => void;
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
  };

  const getFlagForNumber = (phoneNumber: string): string => {
    if (phoneNumber === number.phoneNumber) return number.flag;
    return "🏳️";
  };

  return (
    <div className="animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8"></div> {/* Placeholder for spacing */}
            <div className="text-center flex-grow">
              <CardTitle className="font-headline text-lg">Incoming Messages</CardTitle>
              <CardDescription className="text-sm">{number.flag} {number.phoneNumber}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRefresh} aria-label="Refresh messages" className="h-8 w-8">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ScrollArea className="h-[300px] border rounded-md p-2 mb-3">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 text-sm">No messages yet.</p>
            ) : (
              <div className="space-y-2">
                {messages.map((msg) => {
                  const isOutbound = msg.direction === "outbound";
                  const senderDisplay = isOutbound ? number.phoneNumber : msg.sender;
                  const recipientDisplay = isOutbound ? msg.recipient : number.phoneNumber;
                  const senderFlag = isOutbound ? number.flag : getFlagForNumber(msg.sender);
                  const recipientFlag = isOutbound ? getFlagForNumber(msg.recipient) : number.flag;

                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col p-2 rounded-lg",
                         isOutbound ? "bg-primary text-primary-foreground ml-auto" : "bg-muted dark:bg-secondary",
                         "max-w-[85%]"
                      )}
                    >
                      <div className="flex justify-between items-center text-xs opacity-90 mb-0.5">
                        {isOutbound ? (
                            <span className="truncate">to: {recipientFlag} {recipientDisplay}</span>
                        ) : (
                            <span className="truncate">from: {senderFlag} {senderDisplay}</span>
                        )}
                        <span className="pl-2 shrink-0">{format(parseISO(msg.timestamp), "dd.MM")}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                      {isOutbound && msg.status && (
                        <span className="text-xs opacity-70 mt-0.5 self-end capitalize">{msg.status}</span>
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
              rows={2}
              className="resize-none text-sm"
            />
            <Button type="submit" size="sm" className="w-full sm:w-auto text-xs">
              <Send className="w-3 h-3 mr-1.5" /> Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
