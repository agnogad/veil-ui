import type { Component } from "vue";

export interface BentoGridItem {
  title: string;
  description?: string;
  icon?: Component;
  media?: Component;
  className?: string;
}

export interface BentoGridProps {
  items: BentoGridItem[];
  class?: string;
}
