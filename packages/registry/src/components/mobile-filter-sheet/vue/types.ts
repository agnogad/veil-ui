export interface MobileFilterGroup {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export type MobileFilterValue = Record<string, string[]>;
