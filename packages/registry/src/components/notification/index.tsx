"use client";
import { X } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { IconButton } from "../icon-button/index";

interface NotificationProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Leading icon, typically a lucide icon. */
  icon?: React.ElementType;
  timestamp?: React.ReactNode;
  unread?: boolean;
  onDismiss?: () => void;
  /** Accessible name for the dismiss control. */
  dismissLabel?: string;
  action?: React.ReactNode;
}

function Notification({
  title,
  description,
  icon: Icon,
  timestamp,
  unread = false,
  onDismiss,
  dismissLabel = "Dismiss notification",
  action,
  className,
  ...props
}: NotificationProps) {
  return (
    <div
      data-slot="notification"
      data-unread={unread || undefined}
      className={cn(
        "relative flex w-full items-start gap-3 rounded-lg border bg-card p-3 text-sm shadow-xs",
        unread && "border-primary/30 bg-primary/5",
        className,
      )}
      {...props}
    >
      {Icon ? (
        <div
          aria-hidden
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <Icon className="size-4" />
        </div>
      ) : null}
      <div className="grid min-w-0 flex-1 gap-0.5">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{title}</p>
          {unread ? (
            <span className="sr-only">Unread</span>
          ) : null}
        </div>
        {description ? (
          <p className="text-muted-foreground">{description}</p>
        ) : null}
        {timestamp ? (
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        ) : null}
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
      {onDismiss ? (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="-mr-1 -mt-1"
        >
          <X />
        </IconButton>
      ) : null}
      {unread ? (
        <span
          aria-hidden
          className="absolute top-3 right-3 size-1.5 rounded-full bg-primary"
        />
      ) : null}
    </div>
  );
}

export { Notification };
export type { NotificationProps };
