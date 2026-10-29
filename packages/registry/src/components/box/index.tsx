import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const paddings = {
  none: "p-0",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
} as const;

interface BoxProps extends React.ComponentProps<"div"> {
  /** Render the styles onto a single child element instead of a div. */
  asChild?: boolean;
  padding?: keyof typeof paddings;
}

function Box({ className, asChild = false, padding = "none", ...props }: BoxProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="box"
      data-padding={padding}
      className={cn(paddings[padding], className)}
      {...props}
    />
  );
}

export { Box };
