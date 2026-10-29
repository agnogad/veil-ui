import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface TimelineItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  icon?: React.ElementType;
  status?: "default" | "success" | "warning" | "destructive";
}

interface TimelineProps extends React.ComponentProps<"ol"> {
  items: TimelineItem[];
}

const statusClass = {
  default: "bg-primary text-primary-foreground",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-white",
  destructive: "bg-red-600 text-white",
};

function Timeline({ className, items, ...props }: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      className={cn("relative grid gap-6", className)}
      {...props}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        const last = index === items.length - 1;
        return (
          <li key={index} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                  statusClass[item.status ?? "default"],
                )}
              >
                {Icon ? <Icon className="size-3.5" aria-hidden /> : index + 1}
              </span>
              {!last ? (
                <span className="mt-1 w-px flex-1 bg-border" aria-hidden />
              ) : null}
            </div>
            <div className="pb-2">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-sm font-medium">{item.title}</h3>
                {item.time ? (
                  <time className="text-xs text-muted-foreground">{item.time}</time>
                ) : null}
              </div>
              {item.description ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { Timeline, type TimelineItem };
