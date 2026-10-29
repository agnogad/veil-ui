import type * as React from "react";

import { cn } from "@veil-ui/utils";

function Center({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="center"
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
}

export { Center };
