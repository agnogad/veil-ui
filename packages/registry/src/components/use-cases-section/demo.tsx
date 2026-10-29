import { Briefcase, GraduationCap, Rocket } from "lucide-react";

import { UseCasesSection } from "./index";

export function UseCasesSectionBasic() {
  return (
    <UseCasesSection
      className="w-full max-w-5xl"
      title="Built for every team"
      description="Start from primitives that match how your team already works."
      cases={[
        {
          icon: <Rocket />,
          title: "Startups",
          description: "Ship a polished product surface without a design system team.",
          href: "#startups",
        },
        {
          icon: <Briefcase />,
          title: "Enterprises",
          description: "Standardize patterns across dozens of internal apps.",
          href: "#enterprise",
        },
        {
          icon: <GraduationCap />,
          title: "Education",
          description: "Teach modern UI engineering with readable source.",
        },
      ]}
    />
  );
}

export function UseCasesSectionPlain() {
  return (
    <UseCasesSection
      className="w-full max-w-4xl"
      title="Where teams use it"
      cases={[
        { title: "Dashboards", description: "Dense data with calm visuals." },
        { title: "Onboarding", description: "Focused flows with clear actions." },
      ]}
    />
  );
}
