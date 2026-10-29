import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface StepperStep {
  title: string;
  description?: string;
}

interface StepperProps extends React.ComponentProps<"ol"> {
  steps: StepperStep[];
  /** 1-based index of the active step. */
  current: number;
  orientation?: "horizontal" | "vertical";
}

function Stepper({
  steps,
  current,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  return (
    <ol
      data-slot="stepper"
      className={cn(
        orientation === "horizontal"
          ? "flex w-full items-start gap-2"
          : "grid gap-4",
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const number = index + 1;
        const state =
          number < current
            ? "completed"
            : number === current
              ? "current"
              : "upcoming";

        return (
          <li
            key={step.title}
            aria-current={state === "current" ? "step" : undefined}
            data-state={state}
            className={cn(
              "flex gap-3",
              orientation === "horizontal" && "flex-1 items-start",
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                state === "completed" &&
                  "border-primary bg-primary text-primary-foreground",
                state === "current" && "border-foreground text-foreground",
                state === "upcoming" && "text-muted-foreground",
              )}
            >
              {state === "completed" ? (
                <Check className="size-3.5" aria-hidden />
              ) : (
                number
              )}
            </span>
            <span className="grid gap-0.5">
              <span
                className={cn(
                  "text-sm font-medium",
                  state === "upcoming" && "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
              {step.description ? (
                <span className="text-xs text-muted-foreground">
                  {step.description}
                </span>
              ) : null}
            </span>
            {orientation === "horizontal" && index < steps.length - 1 ? (
              <span
                aria-hidden
                className="mt-3.5 hidden h-px flex-1 bg-border sm:block"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export { Stepper };
export type { StepperStep, StepperProps };
