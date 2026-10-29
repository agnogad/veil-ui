import type { Component } from "vue";

export interface TimelineItem {
  title: string | number;
  description?: string | number;
  time?: string | number;
  icon?: Component;
  status?: "default" | "success" | "warning" | "destructive";
}
