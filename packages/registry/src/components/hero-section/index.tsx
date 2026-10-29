import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface HeroSectionProps extends Omit<React.ComponentProps<"section">, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  align?: "center" | "start";
}

function HeroSection({
  className,
  eyebrow,
  title,
  description,
  actions,
  media,
  align = "center",
  ...props
}: HeroSectionProps) {
  return (
    <section
      data-slot="hero-section"
      className={cn(
        "relative overflow-hidden px-6 py-16 sm:py-20",
        media && "lg:px-8",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-6xl gap-10",
          media && "items-center lg:grid-cols-2",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-5",
            align === "center" && !media && "items-center text-center",
          )}
        >
          {eyebrow ? (
            <span className="inline-flex w-fit items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-xl text-base text-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
          {actions ? (
            <div
              className={cn(
                "flex flex-wrap items-center gap-3",
                align === "center" && !media && "justify-center",
              )}
            >
              {actions}
            </div>
          ) : null}
        </div>
        {media ? (
          <div className="overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
            {media}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export { HeroSection };
export type { HeroSectionProps };
