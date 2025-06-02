
"use client";

import { useState } from 'react';
import { LandingLayout } from "@/components/layout/landing-layout";
import { HeroSection } from "@/components/landing/hero-section";
import { CountrySearchSection } from "@/components/landing/country-search-section";
import { PopularDestinationsSection } from "@/components/landing/popular-destinations-section";
import { AdvancedFeaturesSection } from "@/components/landing/advanced-features-section";
import { SetupGuideSection } from "@/components/landing/setup-guide-section";
import { SmsFeaturesSection } from "@/components/landing/sms-features-section";
import { ManageTrafficSection } from "@/components/landing/manage-traffic-section";
import { DownloadAppSection } from "@/components/landing/download-app-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section"; // Added import

export type ActiveServiceType = 'mobile' | 'virtual';

export default function HomePage() {
  const [activeService, setActiveService] = useState<ActiveServiceType>('mobile');

  return (
    <LandingLayout activeService={activeService} setActiveService={setActiveService}>
      <main className="flex-1">
        <HeroSection activeService={activeService} />
        {/* 
          Future enhancement: Pass activeService to other sections 
          to make them dynamic as well.
          <CountrySearchSection activeService={activeService} />
          <PopularDestinationsSection activeService={activeService} />
          <AdvancedFeaturesSection activeService={activeService} />
          <SmsFeaturesSection activeService={activeService} />
          <ManageTrafficSection activeService={activeService} />
        */}
        <CountrySearchSection />
        <PopularDestinationsSection />
        <AdvancedFeaturesSection />
        <SetupGuideSection />
        <SmsFeaturesSection />
        <ManageTrafficSection />
        <DownloadAppSection />
        <TestimonialsSection />
        <FaqSection /> {/* Added new section */}
      </main>
    </LandingLayout>
  );
}
