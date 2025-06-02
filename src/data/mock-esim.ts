import type { ESIMPlan, ActiveESIMSubscription } from "@/types/esim";

export const mockESIMPlans: ESIMPlan[] = [
  { id: "esim1", country: "USA", countryCode: "US", flag: "🇺🇸", planName: "USA Data Roamer", dataAmountGB: 10, validityDays: 30, price: 20, networkCoverage: ["AT&T", "T-Mobile"] },
  { id: "esim2", country: "Japan", countryCode: "JP", flag: "🇯🇵", planName: "Japan Traveler eSIM", dataAmountGB: 5, validityDays: 15, price: 15, networkCoverage: ["Docomo", "SoftBank"] },
  { id: "esim3", country: "Europe Zone 1", countryCode: "EU", flag: "🇪🇺", planName: "Euro Explorer", dataAmountGB: 20, validityDays: 30, price: 35, networkCoverage: ["Vodafone", "Orange", "Telefonica"] },
  { id: "esim4", country: "Global", countryCode: "WW", flag: "🌍", planName: "Global Nomad", dataAmountGB: 5, validityDays: 60, price: 50, networkCoverage: ["Various Tier 1 operators"] },
];

export const mockActiveSubscriptions: ActiveESIMSubscription[] = [
  {
    id: "active1",
    plan: mockESIMPlans[0],
    activationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    dataRemainingGB: 7.5,
    dataUsedGB: 2.5,
    qrCodeUrl: "https://placehold.co/150x150.png",
    status: "active",
  },
  {
    id: "active2",
    plan: mockESIMPlans[2],
    activationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    dataRemainingGB: 18,
    dataUsedGB: 2,
    qrCodeUrl: "https://placehold.co/150x150.png",
    status: "active",
  },
];
