import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface StatsSectionItem {
  value: React.ReactNode;
  label: string;
  description?: React.ReactNode;
}

interface StatsSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  stats: StatsSectionItem[];
  title?: React.ReactNode;
  description?: React.ReactNode;
}

function StatsSection({
  className,
  stats,
  title,
  description,
  ...props
}: StatsSectionProps) {
  return (
    <div
      data-slot="stats-section"
      className={cn(
        "rounded-xl border bg-muted/20 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      {title ? (
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      ) : null}
      {description ? (
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="text-3xl font-semibold tracking-tight">
              {stat.value}
            </dd>
            <dt className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </dt>
            {stat.description ? (
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}

export { StatsSection };
export type { StatsSectionItem, StatsSectionProps };
