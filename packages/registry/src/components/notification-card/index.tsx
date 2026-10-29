import { AlertTriangle, Bell, CheckCircle2, Info } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card, CardContent } from "../card/index";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  type?: NotificationType;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  unread?: boolean;
  actions?: React.ReactNode;
}

const typeConfig: Record<
  NotificationType,
  { icon: React.ElementType; className: string }
> = {
  info: { icon: Info, className: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  success: {
    icon: CheckCircle2,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  error: { icon: Bell, className: "bg-red-500/10 text-red-600 dark:text-red-400" },
};

function NotificationCard({
  className,
  type = "info",
  title,
  description,
  time,
  unread = false,
  actions,
  ...props
}: NotificationCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card
      data-slot="notification-card"
      data-unread={unread || undefined}
      className={cn(
        "max-w-md gap-0 py-3",
        unread && "border-primary/40 bg-primary/5",
        className,
      )}
      {...props}
    >
      <CardContent className="flex gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full",
            config.className,
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium">{title}</p>
            {unread ? (
              <span
                className="mt-1 size-2 shrink-0 rounded-full bg-primary"
                aria-label="Unread"
              />
            ) : null}
          </div>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
          <div className="mt-1 flex items-center gap-3">
            {time ? (
              <time className="text-xs text-muted-foreground">{time}</time>
            ) : null}
            {actions}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { NotificationCard, type NotificationType };
