import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface BenefitItem {
  title: string;
  description?: React.ReactNode;
}

interface BenefitsSectionProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  benefits: BenefitItem[];
  media?: React.ReactNode;
}

function BenefitsSection({
  className,
  title,
  description,
  benefits,
  media,
  ...props
}: BenefitsSectionProps) {
  return (
    <div
      data-slot="benefits-section"
      className={cn(
        "grid items-center gap-8 md:grid-cols-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
        <ul className="mt-2 grid gap-4">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-3" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium">{benefit.title}</p>
                {benefit.description ? (
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid min-h-56 place-items-center overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-muted/40 to-background p-6">
        {media ?? (
          <span className="text-sm text-muted-foreground">Benefit preview</span>
        )}
      </div>
    </div>
  );
}

export { BenefitsSection };
export type { BenefitItem, BenefitsSectionProps };
