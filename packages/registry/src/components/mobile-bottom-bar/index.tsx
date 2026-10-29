import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobileBottomBarProps extends React.ComponentProps<"div"> {
  /** Keep the bar pinned to the bottom of its scroll container. */
  sticky?: boolean;
}

function MobileBottomBar({
  className,
  sticky = true,
  ...props
}: MobileBottomBarProps) {
  return (
    <div
      data-slot="mobile-bottom-bar"
      className={cn(
        "z-30 flex items-center gap-2 border-t bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur",
        sticky && "sticky bottom-0",
        className,
      )}
      {...props}
    />
  );
}

export { MobileBottomBar };
export type { MobileBottomBarProps };
