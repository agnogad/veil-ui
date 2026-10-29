import { ShieldCheck, Sparkles, Zap } from "lucide-react";

import { FeatureCard } from "./index";

export function FeatureCardBasic() {
  return (
    <FeatureCard
      icon={Zap}
      title="Fast by default"
      description="Every component ships with sensible defaults and no runtime surprises."
    />
  );
}

export function FeatureCardGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FeatureCard
        icon={ShieldCheck}
        title="Accessible"
        description="Keyboard support and ARIA semantics come baked in."
      />
      <FeatureCard
        icon={Sparkles}
        title="Themeable"
        description="Design tokens drive color, spacing and radius across the system."
      />
    </div>
  );
}
