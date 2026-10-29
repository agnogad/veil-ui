import type { Component } from "vue";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationCardProps {
  type?: NotificationType;
  title?: string;
  description?: string;
  time?: string;
  unread?: boolean;
  class?: string;
}

export interface NotificationTypeConfig {
  icon: Component;
  classes: string;
}
