import { Gauge } from "lucide-react";

import { BenefitsSection } from "./index";

export function BenefitsSectionBasic() {
  return (
    <BenefitsSection
      className="w-full max-w-5xl"
      title="Why teams switch"
      description="Less time wiring UI, more time shipping product."
      benefits={[
        {
          title: "Own the source",
          description: "Components land in your repo, ready to edit.",
        },
        {
          title: "Accessible by default",
          description: "Focus management and ARIA handled for you.",
        },
        {
          title: "Consistent by construction",
          description: "Shared tokens keep every page coherent.",
        },
      ]}
    />
  );
}

export function BenefitsSectionWithMedia() {
  return (
    <BenefitsSection
      className="w-full max-w-5xl"
      title="Measure the impact"
      description="Dashboards you can trust, out of the box."
      benefits={[
        { title: "Real-time metrics" },
        { title: "Exportable reports" },
      ]}
      media={
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <Gauge className="size-10 text-primary" aria-hidden />
          Analytics preview
        </div>
      }
    />
  );
}
