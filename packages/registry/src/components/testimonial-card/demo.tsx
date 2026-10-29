import { TestimonialCard } from "./index";

export function TestimonialCardBasic() {
  return (
    <TestimonialCard
      quote="The components feel considered. We shipped our dashboard two weeks ahead of schedule."
      name="Mira Chen"
      role="Product lead, Northwind"
      rating={5}
    />
  );
}

export function TestimonialCardCompact() {
  return (
    <TestimonialCard
      className="max-w-xs"
      quote="Great defaults and an API that stays out of the way."
      name="Sam Okafor"
      role="Staff engineer"
      rating={4}
    />
  );
}
