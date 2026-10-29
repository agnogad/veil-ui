import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Card } from "../card/index";

interface ListItemProps extends Omit<React.ComponentProps<"li">, "title"> {
  leading?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
}

function ListItem({
  className,
  leading,
  title,
  description,
  trailing,
  children,
  ...props
}: ListItemProps) {
  return (
    <li
      data-slot="list-item"
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40",
        className,
      )}
      {...props}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{title}</div>
        {description ? (
          <div className="truncate text-sm text-muted-foreground">{description}</div>
        ) : null}
        {children}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </li>
  );
}

interface ListViewProps extends React.ComponentProps<"ul"> {
  label?: string;
}

function ListView({ className, label, children, ...props }: ListViewProps) {
  return (
    <Card className="overflow-hidden py-0">
      <ul
        data-slot="list-view"
        aria-label={label}
        className={cn("divide-y", className)}
        {...props}
      >
        {children}
      </ul>
    </Card>
  );
}

export { ListItem, ListView };
