import type * as React from "react";

import { cn } from "@veil-ui/utils";

const gaps = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

const alignments = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
} as const;

const justifications = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
} as const;

interface ClusterProps extends React.ComponentProps<"div"> {
  gap?: keyof typeof gaps;
  align?: keyof typeof alignments;
  justify?: keyof typeof justifications;
}

function Cluster({
  className,
  gap = "sm",
  align = "center",
  justify = "start",
  ...props
}: ClusterProps) {
  return (
    <div
      data-slot="cluster"
      className={cn(
        "flex flex-wrap",
        gaps[gap],
        alignments[align],
        justifications[justify],
        className,
      )}
      {...props}
    />
  );
}

export { Cluster };
