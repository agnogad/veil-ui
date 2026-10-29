import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface LinkProps extends React.ComponentProps<"a"> {
  external?: boolean;
  tone?: "default" | "muted";
}

function Link({
  external = false,
  tone = "default",
  className,
  ...props
}: LinkProps) {
  return (
    <a
      data-slot="link"
      className={cn(
        "rounded-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        tone === "muted" && "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...props}
    />
  );
}

export { Link };
export type { LinkProps };
