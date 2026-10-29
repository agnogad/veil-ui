import type * as React from "react";

import { cn } from "@veil-ui/utils";

function FieldGroup({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-group"
      className={cn("grid min-w-0 gap-4 border-0 p-0", className)}
      {...props}
    />
  );
}

function FieldGroupLegend({
  className,
  ...props
}: React.ComponentProps<"legend">) {
  return (
    <legend
      data-slot="field-group-legend"
      className={cn("mb-3 text-sm font-medium", className)}
      {...props}
    />
  );
}

function FieldGroupRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group-row"
      className={cn("grid gap-4 sm:grid-cols-2", className)}
      {...props}
    />
  );
}

export { FieldGroup, FieldGroupLegend, FieldGroupRow };
