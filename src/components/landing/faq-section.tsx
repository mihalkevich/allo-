
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "item-1",
    question: "What is eSIM?",
    answer:
      "eSIM is an electronic SIM card that is built into the smart device. It is not physical but looks like a small chip inside the phone. The same chip is also used for NFC payments. You can connect and use eSIM in a matter of minutes. You do not need to come to the mobile operator's office to do this. Choose a service, for example, Allo, and select any available tariff plan you like. After that, you can stay in touch globally.",
  },
  {
    value: "item-2",
    question: "How to buy an eSIM plan?",
    answer:
      "You can easily browse and purchase eSIM plans directly through our website or the Allo app. Simply select your destination, choose a plan that suits your needs, and complete the checkout process.",
  },
  {
    value: "item-3",
    question: "How to activate the purchased plan?",
    answer:
      "Activation is simple! After purchase, you'll receive a QR code. Scan this code with your eSIM-compatible device, and follow the on-screen instructions. You'll be connected in minutes.",
  },
  {
    value: "item-4",
    question: "Which countries can I choose for data plan purchasing?",
    answer:
      "Allo offers eSIM plans for a wide range of countries and regions worldwide. You can browse our destinations list on the website or in the app to find coverage for your specific travel needs.",
  },
  {
    value: "item-5",
    question: "Which devices are compatible with eSIM?",
    answer:
      "Most modern smartphones and many tablets and smartwatches are eSIM compatible. This includes recent models from Apple, Samsung, Google, and other major manufacturers. Please check your device specifications or contact your device manufacturer to confirm eSIM compatibility.",
  },
  {
    value: "item-6",
    question: "How can I pay for a tariff plan?",
    answer:
      "We accept various payment methods, including major credit cards, debit cards, and popular digital payment platforms. All transactions are secure.",
  },
  {
    value: "item-7",
    question: "What should I do if I have problems connecting to Allo eSIM?",
    answer:
      "If you experience any issues, please ensure your device's eSIM is turned on and mobile data is enabled for the Allo eSIM. You can also consult our troubleshooting guide in the app or contact our 24/7 customer support for assistance.",
  },
  {
    value: "item-8",
    question: "What is better: a Public Wi-Fi or a Tariff Plan?",
    answer:
      "While public Wi-Fi can be convenient, it often comes with security risks and unreliable connectivity. An eSIM tariff plan from Allo provides you with secure, private, and consistent internet access wherever you are, giving you peace of mind and better performance for your data needs.",
  },
];

export function FaqSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container max-w-3xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
          FAQ
        </h2>
        <p className="mb-10 text-center text-lg text-muted-foreground">
          Look for frequently asked questions here to find out more
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-left text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
