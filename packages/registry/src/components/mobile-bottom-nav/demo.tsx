"use client";

import { Bell, Home, Plus, Search, User } from "lucide-react";

import { MobileBottomNav } from "./index";

export function MobileBottomNavBasic() {
  return (
    <MobileBottomNav
      className="max-w-sm rounded-xl border"
      items={[
        { label: "Home", icon: Home, href: "#home", active: true },
        { label: "Search", icon: Search, href: "#search" },
        { label: "Alerts", icon: Bell, href: "#alerts" },
        { label: "Profile", icon: User, href: "#profile" },
      ]}
    />
  );
}

export function MobileBottomNavBadges() {
  return (
    <MobileBottomNav
      className="max-w-sm rounded-xl border"
      items={[
        { label: "Home", icon: Home, href: "#home", active: true },
        { label: "Search", icon: Search, href: "#search", badge: "12" },
        { label: "Alerts", icon: Bell, href: "#alerts", badge: "3" },
        { label: "Profile", icon: User, href: "#profile", badge: "!" },
      ]}
    />
  );
}

export function MobileBottomNavFloating() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-muted/30 p-3">
      <MobileBottomNav
        variant="floating"
        items={[
          { label: "Home", icon: Home, href: "#home", active: true },
          { label: "Search", icon: Search, href: "#search" },
          { label: "Create", icon: Plus, href: "#create" },
          { label: "Alerts", icon: Bell, href: "#alerts", badge: "5" },
          { label: "Profile", icon: User, href: "#profile" },
        ]}
      />
    </div>
  );
}
