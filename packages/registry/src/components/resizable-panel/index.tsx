"use client";

import { GripVertical } from "lucide-react";
import type * as React from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@veil-ui/utils";

function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Group>) {
  return (
    <Group
      data-slot="resizable-panel-group"
      orientation={orientation}
      className={cn(
        "flex size-full",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  className,
  ...props
}: React.ComponentProps<typeof Panel>) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn("min-w-0", className)}
      {...props}
    />
  );
}

interface ResizableHandleProps
  extends React.ComponentProps<typeof Separator> {
  /** Show a grip affordance in the middle of the handle. */
  withHandle?: boolean;
}

function ResizableHandle({
  className,
  withHandle = false,
  ...props
}: ResizableHandleProps) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "group relative flex items-center justify-center bg-border outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        className,
      )}
      {...props}
    >
      {withHandle ? (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="size-2.5" aria-hidden />
        </div>
      ) : null}
    </Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
