import type { Component } from "vue";

export interface MobileBottomNavItem {
  label: string;
  icon: Component;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export type MobileBottomNavVariant = "default" | "floating";

export interface MobileBottomNavProps {
  items: MobileBottomNavItem[];
  onSelect?: (item: MobileBottomNavItem) => void;
  variant?: MobileBottomNavVariant;
  class?: string;
}
