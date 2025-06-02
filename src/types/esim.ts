
export interface ESIMPlan {
  id: string;
  country: string;
  countryCode: string; // e.g., "US"
  flag: string; // Emoji or path to flag image
  planName: string;
  dataAmountGB: number;
  validityDays: number;
  price: number; // in USD or local currency
  networkCoverage?: string[]; // e.g. ["AT&T", "T-Mobile"]
}

export interface ActiveESIMSubscription {
  id: string;
  plan: ESIMPlan;
  activationDate: string; // ISO Date string
  expiryDate: string; // ISO Date string
  dataRemainingGB: number;
  dataUsedGB: number;
  qrCodeUrl: string; // URL to the QR code image or data
  status: "active" | "expired" | "pending_activation";
}
