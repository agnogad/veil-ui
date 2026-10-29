import type * as React from "react";

import { cn } from "@veil-ui/utils";

const widths = {
  xs: "max-w-sm",
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

const gutters = {
  none: "px-0",
  sm: "px-2 sm:px-4",
  md: "px-4 sm:px-6",
  lg: "px-6 sm:px-8",
} as const;

interface ResponsiveContainerProps extends React.ComponentProps<"div"> {
  maxWidth?: keyof typeof widths;
  gutter?: keyof typeof gutters;
  /** Stretch to the full viewport instead of centering. */
  fluid?: boolean;
}

function ResponsiveContainer({
  className,
  maxWidth = "lg",
  gutter = "md",
  fluid = false,
  ...props
}: ResponsiveContainerProps) {
  return (
    <div
      data-slot="responsive-container"
      data-max-width={maxWidth}
      className={cn(
        "w-full",
        !fluid && "mx-auto",
        widths[maxWidth],
        gutters[gutter],
        className,
      )}
      {...props}
    />
  );
}

export { ResponsiveContainer };
