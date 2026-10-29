export type SafeAreaEdge = "top" | "right" | "bottom" | "left";

export interface SafeAreaViewProps {
  /** Edges that should respect the device safe area. Defaults to all. */
  edges?: SafeAreaEdge[];
  class?: string;
}
