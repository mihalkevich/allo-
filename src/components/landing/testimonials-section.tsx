
import { TestimonialCard } from "./testimonial-card";
import { StarIcon } from "@/components/icons/star-icon"; // We'll create this

const testimonials = [
  {
    id: "testimonial1",
    name: "Ruppe Ivana",
    rating: 5,
    title: "The app is incredibly user-friendly",
    text: "The app is incredibly user-friendly, and I love how fast I can activate a plan. I used it in Japan, and it was seamless!",
    avatarFallback: "RI",
  },
  {
    id: "testimonial2",
    name: "George Boden",
    rating: 5,
    title: "Impressed with their transparent data...",
    text: "Impressed with their transparent data policy and the coverage was excellent during my trip across Europe.",
    avatarFallback: "GB",
  },
  {
    id: "testimonial3",
    name: "Alex S.",
    rating: 4,
    title: "Good value and reliable service",
    text: "Good value for money and the service was reliable. Customer support was also quick to respond to a query I had.",
    avatarFallback: "AS",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary/30">
      <div className="container">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
          More than 2,300,000 users choose Allo
        </h2>
        <p className="mb-10 text-center text-lg text-muted-foreground">
          Getting mobile data worldwide with ease and confidence.
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              rating={testimonial.rating}
              title={testimonial.title}
              text={testimonial.text}
              avatarFallback={testimonial.avatarFallback}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
