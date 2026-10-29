import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

interface HeroCtaProps extends React.ComponentProps<"div"> {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  note?: React.ReactNode;
}

function HeroCta({
  className,
  primaryLabel = "Get started",
  primaryHref = "#",
  secondaryLabel,
  secondaryHref = "#",
  note,
  ...props
}: HeroCtaProps) {
  return (
    <div
      data-slot="hero-cta"
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" asChild>
          <a href={primaryHref}>{primaryLabel}</a>
        </Button>
        {secondaryLabel ? (
          <Button size="lg" variant="outline" asChild>
            <a href={secondaryHref}>{secondaryLabel}</a>
          </Button>
        ) : null}
      </div>
      {note ? (
        <p className="text-xs text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}

export { HeroCta };
export type { HeroCtaProps };
