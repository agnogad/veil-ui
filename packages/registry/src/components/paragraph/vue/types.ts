export type ParagraphSize = "sm" | "base" | "lg";
export type ParagraphTone = "default" | "muted";

export interface ParagraphProps {
  size?: ParagraphSize;
  tone?: ParagraphTone;
  class?: string;
}
