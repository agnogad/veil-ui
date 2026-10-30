import type { Component } from "vue";

export interface SwipeableAction {
  label: string;
  icon?: Component;
  onClick: () => void;
  destructive?: boolean;
}
