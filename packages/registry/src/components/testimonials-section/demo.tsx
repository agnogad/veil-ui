import { TestimonialsSection } from "./index";

export function TestimonialsSectionBasic() {
  return (
    <TestimonialsSection
      className="w-full max-w-5xl"
      title="Loved by product teams"
      description="Teams shipping faster with a shared component language."
      testimonials={[
        {
          quote: "We shipped our dashboard two weeks early.",
          name: "Mira Chen",
          role: "Product lead, Acme",
          rating: 5,
        },
        {
          quote: "The source is readable and the defaults are sane.",
          name: "Owen Park",
          role: "Staff engineer, Globex",
          rating: 5,
        },
        {
          quote: "Our design system finally matches production.",
          name: "Lena Ortiz",
          role: "Design director, Initech",
        },
      ]}
    />
  );
}

export function TestimonialsSectionPair() {
  return (
    <TestimonialsSection
      className="w-full max-w-3xl"
      columns={2}
      testimonials={[
        {
          quote: "Accessibility stopped being a checklist.",
          name: "Sam Rivera",
          role: "Frontend lead",
        },
        {
          quote: "Onboarding a new engineer takes a day.",
          name: "Ada Lovelace",
          role: "Engineering manager",
        },
      ]}
    />
  );
}
