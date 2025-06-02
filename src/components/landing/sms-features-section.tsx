
import { SmsFeatureItem } from "./sms-feature-item";
import { ArrowRightLeft, CreditCard, Headset, FileText, Smartphone, Zap } from "lucide-react";

const features = [
  {
    id: "two-way",
    icon: <ArrowRightLeft className="w-10 h-10" />,
    subTitle: "Two-way",
    title: "Calls and Messages",
    description: "Communication from your new caller ID has no limits! Send or receive SMS and Calls on any device, anytime, anywhere.",
  },
  {
    id: "payment",
    icon: <CreditCard className="w-10 h-10" />,
    subTitle: "Convenient",
    title: "Payment Options",
    description: "Securely complete transactions with our versatile payment system, supporting both credit cards and popular digital payment methods.",
  },
  {
    id: "support",
    icon: <Headset className="w-10 h-10" />,
    subTitle: "24/7",
    title: "Customer Support",
    description: "Have any questions? Contact us at the click of a button and we will get back to you before you know it!",
  },
  {
    id: "transparent",
    icon: <FileText className="w-10 h-10" />,
    subTitle: "Transparent",
    title: "Conditions",
    description: "Get virtual numbers at affordable prices with clear terms – no hidden costs, no roaming fees, just transparent conditions.",
  },
  {
    id: "interface",
    icon: <Smartphone className="w-10 h-10" />,
    subTitle: "User-friendly",
    title: "Interface",
    description: "With intuitive design and comprehensive multilingual support, you're one tap away from managing your numbers and messages.",
  },
  {
    id: "setup",
    icon: <Zap className="w-10 h-10" />,
    subTitle: "Swift and Smooth",
    title: "Setup",
    description: "Get your virtual SMS number or eSIM up and running in no time! Simply find your ideal plan/number and activate instantly.",
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
