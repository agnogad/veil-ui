"use client";

import { useState } from "react";

import { PricingSection } from "./index";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For side projects and experiments.",
    features: ["3 projects", "Community support"],
    ctaLabel: "Start free",
  },
  {
    name: "Team",
    price: "$24",
    period: "/month",
    description: "For growing product teams.",
    features: ["Unlimited projects", "10 seats", "Priority support"],
    highlighted: true,
    badge: "Popular",
    ctaLabel: "Start trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations at scale.",
    features: ["SSO and SCIM", "Dedicated support", "Audit logs"],
    ctaLabel: "Contact sales",
  },
];

export function PricingSectionBasic() {
  return (
    <PricingSection
      className="w-full max-w-5xl"
      title="Simple pricing"
      description="Start free, upgrade when your team grows."
      plans={plans}
    />
  );
}

export function PricingSectionSelectable() {
  const [selected, setSelected] = useState("");

  return (
    <div className="grid w-full max-w-5xl gap-4">
      <PricingSection
        title="Choose a plan"
        description="Click a plan to see the selection callback."
        plans={plans}
        onSelectPlan={setSelected}
      />
      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {selected ? `Selected ${selected}` : "No plan selected yet"}
      </p>
    </div>
  );
}
