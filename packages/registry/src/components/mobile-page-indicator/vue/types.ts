export interface MobilePageIndicatorProps {
  count: number;
  index: number;
  onSelect?: (index: number) => void;
  label?: string;
  class?: string;
}
