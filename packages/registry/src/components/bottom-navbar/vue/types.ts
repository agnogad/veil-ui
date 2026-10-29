import type { Component } from "vue";

export interface BottomNavbarItem {
  label: string;
  icon: Component;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export interface BottomNavbarProps {
  items: BottomNavbarItem[];
  onSelect?: (item: BottomNavbarItem) => void;
  variant?: "default" | "floating";
  class?: string;
}
