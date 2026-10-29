"use client";

import { Bell, Home, Plus, Search, User } from "lucide-react";
import { useState } from "react";

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

export function BottomNavigationFloating() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-muted/30 p-3">
      <BottomNavigation
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

export function BottomNavigationInteractive() {
  const destinations = [
    { label: "Home", icon: Home },
    { label: "Search", icon: Search },
    { label: "Alerts", icon: Bell },
    { label: "Profile", icon: User },
  ];
  const [active, setActive] = useState("Home");

  return (
    <div className="grid w-full max-w-sm gap-3">
      <p className="text-center text-sm text-muted-foreground">
        Active: {active}
      </p>
      <BottomNavigation
        className="rounded-md border"
        items={destinations.map((item) => ({
          ...item,
          active: item.label === active,
        }))}
        onSelect={(item) => setActive(item.label)}
      />
    </div>
  );
}
