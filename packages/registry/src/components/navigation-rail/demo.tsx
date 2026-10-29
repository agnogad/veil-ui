"use client";

import { Folder, Home, Settings, Users } from "lucide-react";

import { NavigationRail } from "./index";

export function NavigationRailBasic() {
  return (
    <NavigationRail
      className="h-64 rounded-md border"
      items={[
        { label: "Home", icon: Home, href: "#home" },
        { label: "Projects", icon: Folder, href: "#projects" },
        { label: "Members", icon: Users, href: "#members" },
        { label: "Settings", icon: Settings, href: "#settings" },
      ]}
    />
  );
}

export function NavigationRailActive() {
  return (
    <NavigationRail
      className="h-64 rounded-md border"
      items={[
        { label: "Home", icon: Home, href: "#home" },
        { label: "Projects", icon: Folder, href: "#projects", active: true },
        { label: "Members", icon: Users, href: "#members" },
        { label: "Settings", icon: Settings, href: "#settings" },
      ]}
    />
  );
}
