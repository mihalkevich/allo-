import type { AvailableSMSNumber, LeasedSMSNumber, SMSMessage } from "@/types/sms";

export const mockAvailableNumbers: AvailableSMSNumber[] = [
  { id: "sms1", country: "United States", countryCode: "US", flag: "🇺🇸", phoneNumber: "+14155550100", pricePerMonth: 5, leaseDurationOptions: [1,3,6] },
  { id: "sms2", country: "United Kingdom", countryCode: "GB", flag: "🇬🇧", phoneNumber: "+442079460000", pricePerMonth: 7, leaseDurationOptions: [1,3] },
  { id: "sms3", country: "Canada", countryCode: "CA", flag: "🇨🇦", phoneNumber: "+16475550100", pricePerMonth: 6, leaseDurationOptions: [1,6] },
  { id: "sms4", country: "Germany", countryCode: "DE", flag: "🇩🇪", phoneNumber: "+4915123456789", pricePerMonth: 8, leaseDurationOptions: [1,3,6,12] },
];

export const mockLeasedNumbers: LeasedSMSNumber[] = [
  { 
    id: "leased1", 
    country: "United States", 
    countryCode: "US", 
    flag: "🇺🇸", 
    phoneNumber: "+12025550145", 
    pricePerMonth: 5, 
    leaseDurationOptions: [1,3,6],
    leasedUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), 
    autoRenew: true, 
    comment: "For business inquiries",
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  { 
    id: "leased2", 
    country: "France", 
    countryCode: "FR", 
    flag: "🇫🇷", 
    phoneNumber: "+33123456789", 
    pricePerMonth: 9, 
    leaseDurationOptions: [1,3],
    leasedUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), 
    autoRenew: false,
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockSmsMessages: Record<string, SMSMessage[]> = {
  "+12025550145": [
    { id: "msg1", direction: "inbound", sender: "+19876543210", recipient: "+12025550145", content: "Hello! Is this service still available?", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), status: "received" },
    { id: "msg2", direction: "outbound", sender: "+12025550145", recipient: "+19876543210", content: "Yes, it is. How can I help you?", timestamp: new Date(Date.now() - 58 * 60 * 1000).toISOString(), status: "delivered" },
  ],
  "+33123456789": [
    { id: "msg3", direction: "inbound", sender: "+33987654321", recipient: "+33123456789", content: "Bonjour! Code de vérification: 123456", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), status: "received" },
  ],
};
