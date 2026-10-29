import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface HowItWorksStep {
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
}

interface HowItWorksSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  steps: HowItWorksStep[];
}

function HowItWorksSection({
  className,
  title,
  description,
  steps,
  ...props
}: HowItWorksSectionProps) {
  return (
    <div data-slot="how-it-works-section" className={cn("text-center", className)} {...props}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      <ol className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col items-center">
            <span className="flex size-12 items-center justify-center rounded-full border bg-background text-sm font-semibold shadow-xs [&_svg]:size-5 [&_svg]:text-primary">
              {step.icon ?? index + 1}
            </span>
            <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {step.description}
            </p>
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute left-[calc(50%+2.5rem)] top-6 hidden h-px w-[calc(100%-5rem)] bg-border sm:block"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export { HowItWorksSection };
export type { HowItWorksSectionProps, HowItWorksStep };
