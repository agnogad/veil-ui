import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface FinalCtaProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  note?: React.ReactNode;
}

function FinalCta({
  className,
  title,
  description,
  actions,
  note,
  ...props
}: FinalCtaProps) {
  return (
    <div
      data-slot="final-cta"
      className={cn(
        "overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-muted/40 to-background px-6 py-14 text-center",
        className,
      )}
      {...props}
    >
      <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      ) : null}
      {note ? (
        <p className="mt-4 text-xs text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}

export { FinalCta };
export type { FinalCtaProps };
