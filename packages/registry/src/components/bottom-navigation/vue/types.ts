import type { Component } from "vue";

export interface BottomNavigationItem {
  label: string;
  icon: Component;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export type BottomNavigationVariant = "default" | "floating";

export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  onSelect?: (item: BottomNavigationItem) => void;
  variant?: BottomNavigationVariant;
  class?: string;
}
