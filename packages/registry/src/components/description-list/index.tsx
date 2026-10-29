import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface DescriptionListProps extends React.ComponentProps<"dl"> {
  layout?: "stacked" | "inline";
}

function DescriptionList({
  layout = "stacked",
  className,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      data-slot="description-list"
      className={cn(
        layout === "inline"
          ? "grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[minmax(6rem,auto)_1fr]"
          : "grid gap-4",
        className,
      )}
      {...props}
    />
  );
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function DescriptionDetails({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-details"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { DescriptionList, DescriptionTerm, DescriptionDetails };
export type { DescriptionListProps };
