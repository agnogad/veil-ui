import type { Component } from "vue";

export interface MobileToolbarItem {
  label: string;
  icon?: Component;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export interface MobileToolbarProps {
  items: MobileToolbarItem[];
  class?: string;
}
