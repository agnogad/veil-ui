import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface StickyBottomCtaProps extends React.ComponentProps<"div"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

function StickyBottomCta({
  className,
  label,
  description,
  action,
  children,
  ...props
}: StickyBottomCtaProps) {
  return (
    <div
      data-slot="sticky-bottom-cta"
      className={cn(
        "sticky bottom-0 z-30 flex items-center justify-between gap-3 border-t bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        {label ? (
          <p className="truncate text-sm font-semibold">{label}</p>
        ) : null}
        {description ? (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export { StickyBottomCta };
export type { StickyBottomCtaProps };
