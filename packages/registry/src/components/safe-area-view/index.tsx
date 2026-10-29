import type * as React from "react";

import { cn } from "@veil-ui/utils";

const edgeClasses = {
  top: "pt-[env(safe-area-inset-top)]",
  right: "pr-[env(safe-area-inset-right)]",
  bottom: "pb-[env(safe-area-inset-bottom)]",
  left: "pl-[env(safe-area-inset-left)]",
} as const;

type SafeAreaEdge = keyof typeof edgeClasses;

interface SafeAreaViewProps extends React.ComponentProps<"div"> {
  /** Edges that should respect the device safe area. Defaults to all. */
  edges?: SafeAreaEdge[];
}

function SafeAreaView({
  className,
  edges = ["top", "right", "bottom", "left"],
  ...props
}: SafeAreaViewProps) {
  return (
    <div
      data-slot="safe-area-view"
      data-edges={edges.join(" ")}
      className={cn(edges.map((edge) => edgeClasses[edge]), className)}
      {...props}
    />
  );
}

export { SafeAreaView };
export type { SafeAreaEdge, SafeAreaViewProps };
