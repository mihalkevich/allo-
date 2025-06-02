
import type { AvailableSMSNumber, LeasedSMSNumber, SMSMessage } from "@/types/sms";

export const mockAvailableNumbers: AvailableSMSNumber[] = [
  { id: "sms_us_1", country: "United States", countryCode: "US", flag: "🇺🇸", phoneNumber: "+14155550100", pricePerMonth: 5, leaseDurationOptions: [1,3,6] },
  { id: "sms_gb_1", country: "United Kingdom", countryCode: "GB", flag: "🇬🇧", phoneNumber: "+442079460000", pricePerMonth: 7, leaseDurationOptions: [1,3] },
  { id: "sms_ca_1", country: "Canada", countryCode: "CA", flag: "🇨🇦", phoneNumber: "+16475550100", pricePerMonth: 6, leaseDurationOptions: [1,6] },
  { id: "sms_de_1", country: "Germany", countryCode: "DE", flag: "🇩🇪", phoneNumber: "+4915123456789", pricePerMonth: 8, leaseDurationOptions: [1,3,6,12] },
  { id: "sms_au_1", country: "Australia", countryCode: "AU", flag: "🇦🇺", phoneNumber: "+61298765432", pricePerMonth: 9, leaseDurationOptions: [1,3,6] },
  { id: "sms_br_1", country: "Brazil", countryCode: "BR", flag: "🇧🇷", phoneNumber: "+5511987654321", pricePerMonth: 6, leaseDurationOptions: [1,3] },
  { id: "sms_fr_1", country: "France", countryCode: "FR", flag: "🇫🇷", phoneNumber: "+33123456780", pricePerMonth: 9, leaseDurationOptions: [1,3,6] },
  { id: "sms_in_1", country: "India", countryCode: "IN", flag: "🇮🇳", phoneNumber: "+919876543210", pricePerMonth: 4, leaseDurationOptions: [1,3,6] },
  { id: "sms_jp_1", country: "Japan", countryCode: "JP", flag: "🇯🇵", phoneNumber: "+81345678901", pricePerMonth: 10, leaseDurationOptions: [1,3] },
  { id: "sms_mx_1", country: "Mexico", countryCode: "MX", flag: "🇲🇽", phoneNumber: "+525512345678", pricePerMonth: 5, leaseDurationOptions: [1,3,6] },
  { id: "sms_nl_1", country: "Netherlands", countryCode: "NL", flag: "🇳🇱", phoneNumber: "+31612345678", pricePerMonth: 7, leaseDurationOptions: [1,3,6] },
  { id: "sms_es_1", country: "Spain", countryCode: "ES", flag: "🇪🇸", phoneNumber: "+34912345678", pricePerMonth: 8, leaseDurationOptions: [1,3] },
  { id: "sms_za_1", country: "South Africa", countryCode: "ZA", flag: "🇿🇦", phoneNumber: "+27821234567", pricePerMonth: 6, leaseDurationOptions: [1,3,6] },
  { id: "sms_se_1", country: "Sweden", countryCode: "SE", flag: "🇸🇪", phoneNumber: "+46701234567", pricePerMonth: 9, leaseDurationOptions: [1,3] },
  { id: "sms_sg_1", country: "Singapore", countryCode: "SG", flag: "🇸🇬", phoneNumber: "+6561234567", pricePerMonth: 10, leaseDurationOptions: [1,3,6] },
  { id: "sms_ie_1", country: "Ireland", countryCode: "IE", flag: "🇮🇪", phoneNumber: "+353871234567", pricePerMonth: 7, leaseDurationOptions: [1,3,6] },
  { id: "sms_nz_1", country: "New Zealand", countryCode: "NZ", flag: "🇳🇿", phoneNumber: "+6491234567", pricePerMonth: 9, leaseDurationOptions: [1,3] },
  { id: "sms_ch_1", country: "Switzerland", countryCode: "CH", flag: "🇨🇭", phoneNumber: "+41791234567", pricePerMonth: 11, leaseDurationOptions: [1,3,6] },
  { id: "sms_hk_1", country: "Hong Kong", countryCode: "HK", flag: "🇭🇰", phoneNumber: "+85251234567", pricePerMonth: 10, leaseDurationOptions: [1,3] },
  { id: "sms_at_1", country: "Austria", countryCode: "AT", flag: "🇦🇹", phoneNumber: "+436601234567", pricePerMonth: 8, leaseDurationOptions: [1,3,6] },
];

export const mockLeasedNumbers: LeasedSMSNumber[] = [
  {
    id: "leased_us_1",
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
    id: "leased_fr_1",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    phoneNumber: "+33123456789", // Keeping this one as it might have messages associated
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

    