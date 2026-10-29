import { AlertTriangle } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface ErrorStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Typically a retry button. */
  action?: React.ReactNode;
}

function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  action,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive"
      >
        <AlertTriangle className="size-5" />
      </div>
      <div className="grid gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export { ErrorState };
export type { ErrorStateProps };
