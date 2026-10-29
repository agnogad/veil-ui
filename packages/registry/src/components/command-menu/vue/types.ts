import type { Component } from "vue";

export interface CommandMenuItem {
  label: string;
  value?: string;
  icon?: Component;
  shortcut?: string;
  group?: string;
  onSelect?: () => void;
}

export interface CommandMenuProps {
  items: CommandMenuItem[];
  placeholder?: string;
  emptyMessage?: string;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
