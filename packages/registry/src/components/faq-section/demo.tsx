import { FaqSection } from "./index";

export function FaqSectionBasic() {
  return (
    <FaqSection
      className="w-full max-w-4xl"
      description="Everything you need to know before getting started."
      items={[
        {
          question: "Can I use the components in commercial projects?",
          answer: "Yes. The registry is designed for production use in any project.",
        },
        {
          question: "Do I need Tailwind CSS?",
          answer:
            "Tailwind v4 is recommended. Tokens are exposed as CSS variables so you can adapt them.",
        },
        {
          question: "How do updates work?",
          answer:
            "Components are copied into your repo, so you decide when to pull changes.",
        },
      ]}
    />
  );
}

export function FaqSectionCompact() {
  return (
    <FaqSection
      className="w-full max-w-2xl"
      title="Billing questions"
      items={[
        { question: "Can I cancel anytime?", answer: "Yes, from your dashboard." },
        { question: "Do you offer refunds?", answer: "Within 14 days of purchase." },
      ]}
    />
  );
}
