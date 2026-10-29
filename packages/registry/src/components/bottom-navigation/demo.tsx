"use client";

import { Bell, Home, Search, User } from "lucide-react";

import { BottomNavigation } from "./index";

export function BottomNavigationBasic() {
  return (
    <BottomNavigation
      className="max-w-sm rounded-md border"
      items={[
        { label: "Home", icon: Home, href: "#home", active: true },
        { label: "Search", icon: Search, href: "#search" },
        { label: "Alerts", icon: Bell, href: "#alerts" },
        { label: "Profile", icon: User, href: "#profile" },
      ]}
    />
  );
}

export function BottomNavigationBadges() {
  return (
    <BottomNavigation
      className="max-w-sm rounded-md border"
      items={[
        { label: "Home", icon: Home, href: "#home", active: true },
        { label: "Search", icon: Search, href: "#search" },
        { label: "Alerts", icon: Bell, href: "#alerts", badge: "3" },
        { label: "Profile", icon: User, href: "#profile", badge: "!" },
      ]}
    />
  );
}
