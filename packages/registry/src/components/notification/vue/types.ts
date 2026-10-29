import type { Component } from "vue";

export interface NotificationProps {
  title?: string;
  description?: string;
  /** Leading icon component, typically from lucide-vue-next. */
  icon?: Component;
  timestamp?: string;
  unread?: boolean;
  /** Show the dismiss control without listening for the event. */
  dismissible?: boolean;
  /** Accessible name for the dismiss control. */
  dismissLabel?: string;
  class?: string;
}
