import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  xs: "size-1",
  sm: "size-2",
  md: "size-4",
  lg: "size-6",
  xl: "size-8",
} as const;

interface SpacerProps extends React.ComponentProps<"div"> {
  /** Fixed size instead of filling the remaining space. */
  size?: keyof typeof sizes;
}

function Spacer({ className, size, ...props }: SpacerProps) {
  return (
    <div
      aria-hidden
      data-slot="spacer"
      className={cn(size ? cn("shrink-0", sizes[size]) : "flex-1", className)}
      {...props}
    />
  );
}

export { Spacer };
