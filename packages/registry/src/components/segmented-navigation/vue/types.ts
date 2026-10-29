export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedNavigationProps {
  options: SegmentedOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  class?: string;
}
