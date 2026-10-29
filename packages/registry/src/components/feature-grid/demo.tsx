import { Gauge, Layers, ShieldCheck, Zap } from "lucide-react";

import { FeatureGrid } from "./index";

export function FeatureGridBasic() {
  return (
    <FeatureGrid
      className="w-full max-w-4xl"
      features={[
        {
          icon: <Zap />,
          title: "Fast by default",
          description: "Sensible defaults with zero runtime surprises.",
        },
        {
          icon: <ShieldCheck />,
          title: "Accessible",
          description: "Keyboard support and ARIA built into every primitive.",
        },
        {
          icon: <Layers />,
          title: "Composable",
          description: "Small parts that fit together without overrides.",
        },
      ]}
    />
  );
}

export function FeatureGridTwoColumns() {
  return (
    <FeatureGrid
      className="w-full max-w-3xl"
      columns={2}
      features={[
        {
          icon: <Gauge />,
          title: "Predictable performance",
          description: "No hidden observers or layout thrash.",
        },
        {
          icon: <Layers />,
          title: "Design tokens",
          description: "Theme everything from a single source of truth.",
        },
      ]}
    />
  );
}
