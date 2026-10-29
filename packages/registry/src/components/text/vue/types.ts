export type TextElement = "p" | "span" | "div" | "label" | "strong" | "em";
export type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextTone = "default" | "muted" | "destructive";

export interface TextProps {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  truncate?: boolean;
  class?: string;
}
