
export interface AvailableSMSNumber {
  id: string;
  country: string;
  countryCode: string; // e.g., "US"
  flag: string; // Emoji or path to flag image
  phoneNumber: string;
  pricePerMonth: number; // in USD or local currency
  leaseDurationOptions: number[]; // in months, e.g. [1, 3, 6]
}

export interface LeasedSMSNumber extends AvailableSMSNumber {
  leasedUntil: string; // ISO Date string
  autoRenew: boolean;
  comment?: string;
  lastActivity: string; // ISO Date string
}

export interface SMSMessage {
  id: string;
  direction: "inbound" | "outbound";
  sender: string;
  recipient: string;
  content: string;
  timestamp: string; // ISO Date string
  status: "sent" | "delivered" | "failed" | "received";
}
