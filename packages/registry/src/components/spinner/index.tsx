import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Screen-reader-only status text. */
  label?: string;
}

function Spinner({
  className,
  size,
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <Loader2 aria-hidden className={cn(spinnerVariants({ size }))} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner, spinnerVariants };
