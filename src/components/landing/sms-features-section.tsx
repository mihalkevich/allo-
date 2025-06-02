
import { SmsFeatureItem } from "./sms-feature-item";
import { ArrowRightLeft, CreditCard, Headset, FileText, Smartphone, Zap } from "lucide-react";

const features = [
  {
    id: "two-way",
    icon: <ArrowRightLeft className="w-10 h-10" />,
    subTitle: "Two-way",
    title: "Calls and Messages",
    description: "Enjoy limitless communication with your new caller ID. Send and receive SMS or calls on any device, anywhere, anytime.",
  },
  {
    id: "payment",
    icon: <CreditCard className="w-10 h-10" />,
    subTitle: "Convenient",
    title: "Payment Options",
    description: "Complete transactions securely with our versatile payment system, supporting credit cards and other popular digital methods.",
  },
  {
    id: "support",
    icon: <Headset className="w-10 h-10" />,
    subTitle: "24/7",
    title: "Customer Support",
    description: "Got questions? Reach out with a single click, and our team will get back to you promptly.",
  },
  {
    id: "transparent",
    icon: <FileText className="w-10 h-10" />,
    subTitle: "Transparent",
    title: "Conditions",
    description: "Access virtual numbers at affordable rates with clear, straightforward terms. No hidden fees, no roaming charges, just transparency.",
  },
  {
    id: "interface",
    icon: <Smartphone className="w-10 h-10" />,
    subTitle: "User-friendly",
    title: "Interface",
    description: "Our intuitive design and multilingual support put convenient communication management just a tap away.",
  },
  {
    id: "setup",
    icon: <Zap className="w-10 h-10" />,
    subTitle: "Swift and Smooth",
    title: "Setup",
    description: "Activate your eSIM or virtual number in no time. Choose your ideal plan from our diverse selection and get started instantly.",
  },
];

export function SmsFeaturesSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Advanced Features Of Our Communication Lines
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {features.map((feature) => (
            <SmsFeatureItem
              key={feature.id}
              icon={feature.icon}
              subTitle={feature.subTitle}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

