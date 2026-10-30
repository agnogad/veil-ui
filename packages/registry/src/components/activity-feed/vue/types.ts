import type { Component } from "vue";

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  time: string;
  avatarSrc?: string;
  icon?: Component;
}
