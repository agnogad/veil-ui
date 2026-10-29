import type * as React from "react";

import { cn } from "@veil-ui/utils";

const columns = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

interface FeatureGridItem {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

interface FeatureGridProps extends React.ComponentProps<"div"> {
  features: FeatureGridItem[];
  columns?: keyof typeof columns;
}

function FeatureGrid({
  className,
  features,
  columns: columnCount = 3,
  ...props
}: FeatureGridProps) {
  return (
    <div
      data-slot="feature-grid"
      className={cn("grid gap-4", columns[columnCount], className)}
      {...props}
    >
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-lg border bg-background p-5 shadow-xs"
        >
          {feature.icon ? (
            <span className="mb-3 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4">
              {feature.icon}
            </span>
          ) : null}
          <h3 className="text-sm font-semibold">{feature.title}</h3>
          {feature.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {feature.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export { FeatureGrid };
export type { FeatureGridItem, FeatureGridProps };
