"use client";

import { Folder, Home, Search, Settings } from "lucide-react";

import { Dock } from "./index";

export function DockBasic() {
  return (
    <Dock
      items={[
        { label: "Home", icon: Home, href: "#home" },
        { label: "Search", icon: Search, href: "#search" },
        { label: "Files", icon: Folder, href: "#files" },
        { label: "Settings", icon: Settings, href: "#settings" },
      ]}
    />
  );
}

export function DockActive() {
  return (
    <Dock
      items={[
        { label: "Home", icon: Home, href: "#home" },
        { label: "Search", icon: Search, href: "#search", active: true },
        { label: "Files", icon: Folder, href: "#files" },
        { label: "Settings", icon: Settings, href: "#settings" },
      ]}
    />
  );
}
