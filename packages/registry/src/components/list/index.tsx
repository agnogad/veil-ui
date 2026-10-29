import type * as React from "react";

import { cn } from "@veil-ui/utils";

const spacings = {
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-3",
} as const;

const variants = {
  disc: "list-disc pl-5",
  decimal: "list-decimal pl-5",
  none: "list-none pl-0",
} as const;

interface ListProps extends React.ComponentProps<"ul"> {
  as?: "ul" | "ol";
  variant?: keyof typeof variants;
  spacing?: keyof typeof spacings;
}

function List({
  as = "ul",
  variant = "disc",
  spacing = "md",
  className,
  ...props
}: ListProps) {
  const Comp = as as "ul";

  return (
    <Comp
      data-slot="list"
      className={cn(
        "marker:text-muted-foreground",
        variants[variant],
        spacings[spacing],
        className,
      )}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-item"
      className={cn("leading-relaxed", className)}
      {...props}
    />
  );
}

export { List, ListItem };
export type { ListProps };
