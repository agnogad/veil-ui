import type { Component } from "vue";

export interface MobileShareTarget {
  label: string;
  icon?: Component;
  href?: string;
  onClick?: () => void;
}
