import { PricingCard } from "./index";

export function PricingCardBasic() {
  return (
    <PricingCard
      name="Starter"
      price="$0"
      description="For personal projects and experiments."
      features={["1 project", "Community support", "1 GB storage"]}
      ctaLabel="Start free"
    />
  );
}

export function PricingCardHighlighted() {
  return (
    <PricingCard
      name="Team"
      price="$24"
      description="For product teams shipping every week."
      features={["Unlimited projects", "Priority support", "50 GB storage", "Audit log"]}
      ctaLabel="Upgrade to Team"
      highlighted
      badge="Popular"
    />
  );
}
