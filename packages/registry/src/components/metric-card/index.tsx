import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardContent } from "../card/index";

interface MetricCardProps extends React.ComponentProps<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
  target: number;
  current: number;
  unit?: string;
  description?: React.ReactNode;
}

function MetricCard({
  className,
  label,
  value,
  target,
  current,
  unit,
  description,
  ...props
}: MetricCardProps) {
  const percentage =
    target <= 0 ? 0 : Math.min(100, Math.max(0, Math.round((current / target) * 100)));

  return (
    <Card data-slot="metric-card" className={cn("max-w-sm gap-2", className)} {...props}>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
        <p className="text-2xl font-semibold tracking-tight">
          {value}
          {unit ? (
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              {unit}
            </span>
          ) : null}
        </p>
        <div
          role="progressbar"
          aria-label={typeof label === "string" ? label : "Progress"}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-valuenow={current}
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { MetricCard };
