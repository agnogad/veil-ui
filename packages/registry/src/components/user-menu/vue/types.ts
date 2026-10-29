import type { Component } from "vue";

export interface UserMenuItem {
  label: string;
  href?: string;
  onSelect?: () => void;
  icon?: Component;
}

export interface UserMenuProps {
  name: string;
  email: string;
  avatarSrc?: string;
  items?: UserMenuItem[];
  onSignOut?: () => void;
  class?: string;
}
