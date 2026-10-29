import type { Component } from "vue";

export interface DockItem {
  label: string;
  icon: Component;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItem[];
  label?: string;
  class?: string;
}
