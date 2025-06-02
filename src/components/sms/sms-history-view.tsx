"use client";

import type { LeasedSMSNumber, SMSMessage } from "@/types/sms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Inbox } from "lucide-react";
import { format, parseISO } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SMSHistoryViewProps {
  number: LeasedSMSNumber;
  messages: SMSMessage[];
  onClose: () => void;
}

export function SMSHistoryView({ number, messages, onClose }: SMSHistoryViewProps) {
  const { toast } = useToast();

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const messageContent = formData.get('messageContent') as string;
    if (messageContent.trim()) {
       toast({
        title: "Message Sent (Demo)",
        description: `To: ${number.phoneNumber}, Message: ${messageContent}`,
      });
      console.log(`Sending message "${messageContent}" from ${number.phoneNumber}`);
      // Reset form or add message to list optimistically
      (event.target as HTMLFormElement).reset();
    }
  };


  return (
    <div className="animate-fade-in p-1">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Back to my numbers">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center flex-grow">
              <CardTitle className="font-headline text-xl">SMS History</CardTitle>
              <CardDescription>{number.flag} {number.phoneNumber}</CardDescription>
            </div>
            <div className="w-10"></div> {/* Spacer */}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] border rounded-md p-4 mb-4">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col p-3 rounded-lg max-w-[75%]",
                      msg.direction === "outbound"
                        ? "bg-primary text-primary-foreground self-end items-end"
                        : "bg-secondary text-secondary-foreground self-start items-start"
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-80 mt-1">
                      {format(parseISO(msg.timestamp), "MMM d, HH:mm")}
                      {msg.direction === "outbound" && ` (${msg.status})`}
                    </span>
                    <Badge variant={msg.direction === "outbound" ? "default" : "secondary"} className="mt-1 capitalize text-xs px-1.5 py-0.5">
                      {msg.direction === "outbound" ? <Send className="w-3 h-3 mr-1" /> : <Inbox className="w-3 h-3 mr-1" />}
                      {msg.direction}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="space-y-2">
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
