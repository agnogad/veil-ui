export interface RepeaterField {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export type RepeaterRow = Record<string, string>;

export interface FormRepeaterProps {
  fields: RepeaterField[];
  defaultValue?: RepeaterRow[];
  addLabel?: string;
  /** Minimum number of rows that must remain. */
  min?: number;
  /** Maximum number of rows allowed. */
  max?: number;
  disabled?: boolean;
  class?: string;
}
