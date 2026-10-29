import type * as React from "react";

import { cn } from "@veil-ui/utils";

const alignments = {
  start: "justify-start",
  end: "justify-end",
  between: "justify-between",
  center: "justify-center",
} as const;

interface FormActionsProps extends React.ComponentProps<"div"> {
  align?: keyof typeof alignments;
}

function FormActions({
  className,
  align = "end",
  ...props
}: FormActionsProps) {
  return (
    <div
      data-slot="form-actions"
      data-align={align}
      className={cn(
        "flex flex-wrap items-center gap-2 border-t pt-4",
        alignments[align],
        className,
      )}
      {...props}
    />
  );
}

export { FormActions };
