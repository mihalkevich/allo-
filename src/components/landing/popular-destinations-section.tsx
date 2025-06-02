
import { Button } from "@/components/ui/button";
import { DestinationCard } from "./destination-card";
import Link from "next/link";

const popularDestinationsData = [
  { name: "United Kingdom", flag: "🇬🇧", id: "gb" },
  { name: "USA", flag: "🇺🇸", id: "us" },
  { name: "United Arab Emirates", flag: "🇦🇪", id: "ae" },
  { name: "Singapore", flag: "🇸🇬", id: "sg" },
  { name: "Turkey", flag: "🇹🇷", id: "tr" },
  { name: "Italy", flag: "🇮🇹", id: "it" },
  { name: "Germany", flag: "🇩🇪", id: "de" },
  { name: "China", flag: "🇨🇳", id: "cn" },
];

export function PopularDestinationsSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {popularDestinationsData.map((dest) => (
            <DestinationCard key={dest.id} countryName={dest.name} flagEmoji={dest.flag} countryCode={dest.id} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/register" passHref>
            <Button size="lg" className="px-8 py-3 text-base shadow-md hover:shadow-lg transition-shadow">
              See all countries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
