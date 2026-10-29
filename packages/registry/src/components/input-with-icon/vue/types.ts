import type { Component } from "vue";

export interface InputWithIconProps {
  /** Decorative icon component rendered at the start or end of the input. */
  icon: Component;
  position?: "left" | "right";
  class?: string;
}
