import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardContent } from "../card/index";

interface StatisticCardProps extends React.ComponentProps<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: number;
  deltaLabel?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ElementType;
}

function StatisticCard({
  className,
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  trend = "neutral",
  icon: Icon,
  ...props
}: StatisticCardProps) {
  const TrendIcon =
    trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowRight;
  const trendColor =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground";

  return (
    <Card data-slot="statistic-card" className={cn("max-w-xs gap-2", className)} {...props}>
      <CardContent className="space-y-1">
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>{label}</span>
          {Icon ? <Icon className="size-4" aria-hidden /> : null}
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {delta !== undefined ? (
          <p className="flex items-center gap-1 text-xs">
            <span className={cn("flex items-center gap-0.5 font-medium", trendColor)}>
              <TrendIcon className="size-3.5" aria-hidden />
              {delta > 0 ? "+" : ""}
              {delta}%
            </span>
            <span className="text-muted-foreground">{deltaLabel}</span>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { StatisticCard };
