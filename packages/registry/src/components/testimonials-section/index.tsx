import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { TestimonialCard } from "../testimonial-card/index";

interface TestimonialItem {
  quote: React.ReactNode;
  name: string;
  role?: string;
  avatarSrc?: string;
  rating?: number;
}

interface TestimonialsSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  testimonials: TestimonialItem[];
  columns?: 2 | 3;
}

function TestimonialsSection({
  className,
  title,
  description,
  testimonials,
  columns = 3,
  ...props
}: TestimonialsSectionProps) {
  return (
    <div
      data-slot="testimonials-section"
      className={cn("grid gap-6", className)}
      {...props}
    >
      {title || description ? (
        <div className="mx-auto max-w-2xl text-center">
          {title ? (
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn(
          "grid gap-4",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            quote={testimonial.quote}
            name={testimonial.name}
            role={testimonial.role}
            avatarSrc={testimonial.avatarSrc}
            rating={testimonial.rating}
            className="max-w-none"
          />
        ))}
      </div>
    </div>
  );
}

export { TestimonialsSection };
export type { TestimonialItem, TestimonialsSectionProps };
