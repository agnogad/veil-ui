import type { Component } from "vue";

export interface NavigationRailItem {
  label: string;
  icon: Component;
  href?: string;
  active?: boolean;
}

export interface NavigationRailProps {
  items: NavigationRailItem[];
  label?: string;
  onSelect?: (item: NavigationRailItem) => void;
  class?: string;
}
