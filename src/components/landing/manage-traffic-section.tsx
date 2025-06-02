
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ManageTrafficSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="mb-2 text-sm font-semibold uppercase text-primary">
              Step 04
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Manage your eSIM traffic
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              You can download the Allo app to manage your eSIM profiles and data usage more easily, keeping you in control wherever you are.
            </p>
            <Link href="/register" passHref>
              <Button size="lg" className="px-8 py-3 text-base shadow-md hover:shadow-lg transition-shadow">
                Get Mobile Data
              </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2 aspect-square relative w-full max-w-md mx-auto md:max-w-none">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Manage eSIM Traffic"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
              data-ai-hint="smartphone app interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
