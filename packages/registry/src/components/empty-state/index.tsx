import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface EmptyStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Decorative icon shown above the copy. */
  icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary call to action rendered below the copy. */
  action?: React.ReactNode;
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  children,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {Icon ? (
        <div
          aria-hidden
          className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <Icon className="size-5" />
        </div>
      ) : null}
      <div className="grid gap-1">
        <p className="text-sm font-medium">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
