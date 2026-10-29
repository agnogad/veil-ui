import type { Component } from "vue";

export interface EmptyStateProps {
  /** Decorative icon shown above the copy. */
  icon?: Component;
  title?: string;
  description?: string;
  class?: string;
}
