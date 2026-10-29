import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface FeatureShowcaseItem {
  title: string;
  description: string;
  bullets?: string[];
  media?: React.ReactNode;
  reverse?: boolean;
}

interface FeatureShowcaseProps extends React.ComponentProps<"div"> {
  features: FeatureShowcaseItem[];
}

function FeatureShowcase({
  className,
  features,
  ...props
}: FeatureShowcaseProps) {
  return (
    <div
      data-slot="feature-showcase"
      className={cn("grid gap-14", className)}
      {...props}
    >
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className={cn(
            "grid items-center gap-8 md:grid-cols-2",
            feature.reverse && "md:[&>*:first-child]:order-2",
          )}
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Feature {index + 1}
            </span>
            <h3 className="text-2xl font-semibold tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
            {feature.bullets?.length ? (
              <ul className="mt-1 grid gap-2 text-sm">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 text-primary" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid min-h-48 place-items-center overflow-hidden rounded-xl border bg-gradient-to-br from-muted/50 to-background p-4">
            {feature.media ?? (
              <span className="text-sm text-muted-foreground">
                {feature.title} preview
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { FeatureShowcase };
export type { FeatureShowcaseItem, FeatureShowcaseProps };
