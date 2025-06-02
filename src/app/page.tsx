
import { LandingLayout } from "@/components/layout/landing-layout";
import { HeroSection } from "@/components/landing/hero-section";
import { CountrySearchSection } from "@/components/landing/country-search-section";
import { PopularDestinationsSection } from "@/components/landing/popular-destinations-section";
import { AdvancedFeaturesSection } from "@/components/landing/advanced-features-section";

export default function HomePage() {
  return (
    <LandingLayout>
      <main className="flex-1">
        <HeroSection />
        <CountrySearchSection />
        <PopularDestinationsSection />
        <AdvancedFeaturesSection />
      </main>
    </LandingLayout>
  );
}
