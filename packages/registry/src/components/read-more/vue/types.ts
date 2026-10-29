export type ReadMoreLines = 1 | 2 | 3 | 4 | 5 | 6;

export interface ReadMoreProps {
  lines?: ReadMoreLines;
  moreLabel?: string;
  lessLabel?: string;
  defaultExpanded?: boolean;
  class?: string;
}
