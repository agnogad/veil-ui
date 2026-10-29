export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";
export type HeadingTone = "default" | "muted";

export interface HeadingProps {
  level?: HeadingLevel;
  /** Visual size; defaults to the level. */
  size?: HeadingLevel;
  weight?: HeadingWeight;
  tone?: HeadingTone;
  class?: string;
}
