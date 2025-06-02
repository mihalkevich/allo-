
import { Button } from "@/components/ui/button";
import Link from "next/link";

const setupSteps = [
  {
    stepNumber: "01",
    title: "Choose eSIM data plan",
    description: "Choose an eSIM data plan that is best suited to your needs. Stay connected with the entire world, anytime and anywhere.",
  },
  {
    stepNumber: "02",
    title: "Easy installation of eSIM",
    description: "Upon completion of purchase, a step-by-step guide and a QR code for digital activation will be sent to you.",
  },
  {
    stepNumber: "03",
    title: "Done! You are online!",
    description: "Enjoy a fast and reliable Internet connection, affordable calls and text messages worldwide with Allo!",
  },
  {
    stepNumber: "04",
    title: "Manage your eSIM traffic",
    description: "You can download the Allo app to manage your eSIM profiles more easily.",
  },
];

export function SetupGuideSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          eSIM Mobile Setup Guide
        </h2>
        <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Take these 4 easy steps to get eSIM-powered mobile data on your phone!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left md:text-center">
          {setupSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-primary font-bold text-2xl shadow-md">
                {step.stepNumber}
              </div>
              <h3 className="text-xl font-semibold text-foreground pt-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>

        <Link href="/register" passHref>
          <Button size="lg" className="px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-shadow">
            Get Mobile Data
          </Button>
        </Link>
      </div>
    </section>
  );
}
