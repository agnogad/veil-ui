"use client";
import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Card, CardContent, CardHeader, CardTitle } from "../card/index";

interface PricingCardProps extends React.ComponentProps<"div"> {
  name: string;
  price: React.ReactNode;
  period?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
  onSelect?: () => void;
}

function PricingCard({
  className,
  name,
  price,
  period = "/month",
  description,
  features,
  ctaLabel = "Choose plan",
  highlighted = false,
  badge,
  onSelect,
  ...props
}: PricingCardProps) {
  return (
    <Card
      data-slot="pricing-card"
      data-highlighted={highlighted || undefined}
      className={cn(
        "max-w-sm",
        highlighted && "border-primary shadow-md ring-1 ring-primary",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{name}</CardTitle>
          {badge ? (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {badge}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
        <p className="flex items-baseline gap-1 pt-2">
          <span className="text-3xl font-semibold tracking-tight">{price}</span>
          <span className="text-sm text-muted-foreground">{period}</span>
        </p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="grid gap-2 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant={highlighted ? "default" : "outline"}
          className="w-full"
          onClick={onSelect}
        >
          {ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

export { PricingCard };
