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
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const justifications = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
} as const;

interface StackProps extends React.ComponentProps<"div"> {
  direction?: "row" | "column";
  gap?: keyof typeof gaps;
  align?: keyof typeof alignments;
  justify?: keyof typeof justifications;
  wrap?: boolean;
}

function Stack({
  className,
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  ...props
}: StackProps) {
  return (
    <div
      data-slot="stack"
      data-direction={direction}
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gaps[gap],
        alignments[align],
        justifications[justify],
        wrap && "flex-wrap",
        className,
      )}
      {...props}
    />
  );
}

export { Stack };
