
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneForwarded, FileText, Clock, Globe, Smartphone, ShieldCheck } from 'lucide-react';

const features = [
  { icon: <PhoneForwarded className="w-6 h-6 text-primary" />, text: "Two-way calls and messages" },
  { icon: <FileText className="w-6 h-6 text-primary" />, text: "Efficient text message management" },
  { icon: <Clock className="w-6 h-6 text-primary" />, text: "Round-the-clock online customer support" },
  { icon: <Globe className="w-6 h-6 text-primary" />, text: "User-friendly localized control panel" },
  { icon: <Smartphone className="w-6 h-6 text-primary" />, text: "Access to virtual phone numbers on any device" },
  { icon: <ShieldCheck className="w-6 h-6 text-primary" />, text: "Budget-friendly rates, crystal-clear terms, zero roaming charges" },
];

const GooglePlayIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.535 8.632c-1.214-1.548-3.008-2.49-4.938-2.49-1.793 0-3.47.768-4.697 2.035l7.043 7.042c1.103-1.293 1.94-2.932 2.592-4.587zM3.424 6.213C2.586 7.643 2 9.267 2 11c0 2.281.965 4.357 2.53 5.807l7.03-7.03-6.136-3.564zM12.94 3.045c-1.657 0-3.2.57-4.432 1.539l-3.564 6.137L12 17.792l7.512-7.512c-.188-.21-.39-.41-.604-.603C17.233 4.557 15.22 3.045 12.94 3.045zm0 16.71L5.02 11.837l-2.43 4.21c1.43 1.658 3.506 2.71 5.817 2.71 1.06 0 2.076-.21 3.01-.592l1.523-2.37z"/>
  </svg>
);

const AppleAppStoreIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.328 12.045c0 1.643-.725 3.15-1.914 4.214-.04.032-.08.06-.12.092-.02.015-.038.03-.058.045-.04.03-.08.058-.12.087-1.08.776-2.402 1.246-3.845 1.246-1.204 0-2.34-.34-3.28-.958-.9-.59-1.596-1.52-2.015-2.712H19.328zM9.99 2.985c1.295 0 2.707.762 3.512 1.478.582.523.94 1.01 1.158 1.44-.464.278-.98.49-1.538.63-.09-.362-.25-.708-.47-1.018-.81-1.14-2.26-1.8-3.52-1.8-.3 0-.6.03-.89.08.17-.22.36-.43.57-.62.59-.53.91-.79 1.178-.79zM12.007 8.435c1.44-.06 2.88-.72 3.84-1.74-.06-.96-.72-2.28-1.8-3.06-1.02-.72-2.16-1.08-3.24-1.08-1.98 0-3.78.96-4.98 2.52-1.62 2.16-1.5 5.4.36 7.68.9 1.08 2.1 1.8 3.48 1.8.66 0 1.38-.18 2.04-.6-.12-.06-.24-.12-.36-.24-.9-.78-1.44-1.98-1.32-3.24z" />
  </svg>
);

export function DownloadAppSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Download the Allo app and manage your international mobile data with greater comfort
            </h2>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 shrink-0">{feature.icon}</span>
                  <span className="text-muted-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/register" passHref legacyBehavior>
                <Button size="lg" variant="outline" className="w-full sm:w-auto justify-center bg-foreground text-background hover:bg-foreground/90 border-foreground">
                  <GooglePlayIcon />
                  <div>
                    <div className="text-xs uppercase">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </Button>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Button size="lg" variant="outline" className="w-full sm:w-auto justify-center bg-foreground text-background hover:bg-foreground/90 border-foreground">
                 <AppleAppStoreIcon />
                  <div>
                    <div className="text-xs uppercase">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-video relative w-full max-w-md mx-auto md:max-w-none">
            <Image
              src="https://placehold.co/400x600.png"
              alt="Allo App Interface"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              data-ai-hint="mobile app interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
