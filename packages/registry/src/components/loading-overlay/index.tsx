import type * as React from "react";

import { Spinner } from "../spinner/index";
import { cn } from "@veil-ui/utils";

interface LoadingOverlayProps extends React.ComponentProps<"div"> {
  visible?: boolean;
  label?: string;
  fullscreen?: boolean;
}

function LoadingOverlay({
  visible = true,
  label = "Loading",
  fullscreen = false,
  className,
  ...props
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      data-slot="loading-overlay"
      aria-busy="true"
      className={cn(
        "flex items-center justify-center bg-background/80 backdrop-blur-sm",
        fullscreen ? "fixed inset-0 z-50" : "absolute inset-0 z-10",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <Spinner size="lg" label={label} />
        <span aria-hidden>{label}</span>
      </div>
    </div>
  );
}

export { LoadingOverlay };
export type { LoadingOverlayProps };
