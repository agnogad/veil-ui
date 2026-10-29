import { CheckCircle2 } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface SuccessStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

function SuccessState({
  title = "All done",
  description,
  action,
  className,
  ...props
}: SuccessStateProps) {
  return (
    <div
      data-slot="success-state"
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <CheckCircle2 className="size-5" />
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

export { SuccessState };
export type { SuccessStateProps };
