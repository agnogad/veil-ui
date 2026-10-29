import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface CaptionProps extends React.ComponentProps<"span"> {
  tone?: "default" | "muted";
}

function Caption({ tone = "muted", className, ...props }: CaptionProps) {
  return (
    <span
      data-slot="caption"
      className={cn(
        "text-xs leading-normal",
        tone === "muted" ? "text-muted-foreground" : "text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Caption };
export type { CaptionProps };
