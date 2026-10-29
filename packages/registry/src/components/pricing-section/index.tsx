"use client";

import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { PricingCard } from "../pricing-card/index";

interface PricingPlan {
  name: string;
  price: React.ReactNode;
  period?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  plans: PricingPlan[];
  onSelectPlan?: (plan: string) => void;
}

function PricingSection({
  className,
  title,
  description,
  plans,
  onSelectPlan,
  ...props
}: PricingSectionProps) {
  return (
    <div data-slot="pricing-section" className={cn("grid gap-6", className)} {...props}>
      {title || description ? (
        <div className="mx-auto max-w-2xl text-center">
          {title ? (
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="grid items-start gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            period={plan.period}
            description={plan.description}
            features={plan.features}
            ctaLabel={plan.ctaLabel}
            highlighted={plan.highlighted}
            badge={plan.badge}
            onSelect={
              onSelectPlan ? () => onSelectPlan(plan.name) : undefined
            }
            className="max-w-none"
          />
        ))}
      </div>
    </div>
  );
}

export { PricingSection };
export type { PricingPlan, PricingSectionProps };
