import type { Component } from "vue";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Heart,
  Home,
  Mail,
  Search,
  Settings,
  Star,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-vue-next";

export interface IconPickerItem {
  name: string;
  icon: Component;
}

export const defaultIcons: IconPickerItem[] = [
  { name: "ArrowRight", icon: ArrowRight },
  { name: "Check", icon: Check },
  { name: "Copy", icon: Copy },
  { name: "Download", icon: Download },
  { name: "Heart", icon: Heart },
  { name: "Home", icon: Home },
  { name: "Mail", icon: Mail },
  { name: "Search", icon: Search },
  { name: "Settings", icon: Settings },
  { name: "Star", icon: Star },
  { name: "Trash", icon: Trash2 },
  { name: "Upload", icon: Upload },
  { name: "User", icon: User },
  { name: "X", icon: X },
];
