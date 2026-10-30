export interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  language?: string;
  showLineNumbers?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  class?: string;
}
