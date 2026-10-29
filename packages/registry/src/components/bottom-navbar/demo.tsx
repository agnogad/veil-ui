"use client";

import { Home, Settings, User } from "lucide-react";

import { BottomNavbar } from "./index";

export function BottomNavbarBasic() {
  return (
    <BottomNavbar
      className="max-w-sm rounded-md border"
      items={[
        { label: "Home", icon: Home, href: "#home", active: true },
        { label: "Account", icon: User, href: "#account" },
        { label: "Settings", icon: Settings, href: "#settings" },
      ]}
    />
  );
}
