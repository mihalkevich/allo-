
import { FeatureItemCard } from "./feature-item-card";

const features = [
  {
    id: "feature1",
    title: "Global Coverage",
    description: "Stay connected in over 190 countries with our reliable eSIM network.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "globe network"
  },
  {
    id: "feature2",
    title: "Instant Activation",
    description: "Get your eSIM activated within minutes. No more waiting for physical SIM cards.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "smartphone qr"
  },
  {
    id: "feature3",
    title: "Flexible Plans",
    description: "Choose from a variety of data plans tailored to your travel needs and duration.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "calendar chart"
  },
];

export function AdvancedFeaturesSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Advanced Features Of Our Communication
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 lg:gap-x-8">
          {features.map((feature) => (
            <FeatureItemCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              imageHint={feature.imageHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
