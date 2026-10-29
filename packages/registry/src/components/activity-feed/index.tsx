import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { Card } from "../card/index";

interface ActivityItem {
  id: string;
  actor: string;
  action: React.ReactNode;
  target?: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
  icon?: React.ElementType;
}

interface ActivityFeedProps extends React.ComponentProps<"ol"> {
  items: ActivityItem[];
  label?: string;
}

function ActivityFeed({
  className,
  items,
  label = "Activity feed",
  ...props
}: ActivityFeedProps) {
  return (
    <Card className="overflow-hidden py-0">
      <ol
        data-slot="activity-feed"
        aria-label={label}
        className={cn("divide-y", className)}
        {...props}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const fallback = item.actor
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <li key={item.id} className="flex gap-3 px-4 py-3">
              <div className="relative">
                <Avatar size="sm">
                  {item.avatarSrc ? <AvatarImage src={item.avatarSrc} alt="" /> : null}
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                {Icon ? (
                  <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border bg-background">
                    <Icon className="size-2.5 text-muted-foreground" aria-hidden />
                  </span>
                ) : null}
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="truncate">
                  <span className="font-medium">{item.actor}</span> {item.action}
                  {item.target ? (
                    <span className="font-medium"> {item.target}</span>
                  ) : null}
                </p>
                <time className="text-xs text-muted-foreground">{item.time}</time>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

export { ActivityFeed, type ActivityItem };
