import { CaseStudiesSection } from "./index";

export function CaseStudiesSectionBasic() {
  return (
    <CaseStudiesSection
      className="w-full max-w-4xl"
      title="Customer stories"
      description="How teams measure the impact of a shared system."
      studies={[
        {
          company: "Acme",
          title: "Rebuilding the admin in six weeks",
          summary:
            "A two-person team replaced three legacy interfaces with one coherent shell.",
          metric: "3×",
          metricLabel: "faster delivery",
          href: "#acme",
        },
        {
          company: "Globex",
          title: "One design language across 14 apps",
          summary:
            "Tokens and primitives aligned product families without a rewrite.",
          metric: "-42%",
          metricLabel: "UI defects",
          href: "#globex",
        },
      ]}
    />
  );
}

export function CaseStudiesSectionCompact() {
  return (
    <CaseStudiesSection
      className="w-full max-w-3xl"
      studies={[
        {
          company: "Initech",
          title: "Accessibility audit passed",
          summary: "Every flow cleared WCAG AA on the first pass.",
          metric: "100%",
          metricLabel: "AA coverage",
        },
      ]}
    />
  );
}
