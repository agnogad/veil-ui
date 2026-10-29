import type { Component } from "vue";

export interface NotificationCenterItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  unread?: boolean;
  icon?: Component;
}

export interface NotificationCenterProps {
  notifications: NotificationCenterItem[];
  /** Heading inside the popover. */
  title?: string;
  /** Accessible name for the bell trigger. */
  triggerLabel?: string;
  emptyLabel?: string;
  class?: string;
}
