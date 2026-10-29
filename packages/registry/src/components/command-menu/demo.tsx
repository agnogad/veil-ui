"use client";

import { Calendar, Settings, User } from "lucide-react";

import { CommandMenu } from "./index";

export function CommandMenuBasic() {
  return (
    <CommandMenu
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Open command menu
        </button>
      }
      items={[
        { label: "Calendar", icon: <Calendar />, shortcut: "G C" },
        { label: "Profile", icon: <User />, shortcut: "G P" },
        { label: "Settings", icon: <Settings />, shortcut: "G S" },
      ]}
    />
  );
}

export function CommandMenuGroups() {
  return (
    <CommandMenu
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Search everything
        </button>
      }
      items={[
        { label: "New project", group: "Create", shortcut: "⌘N" },
        { label: "Invite teammate", group: "Create" },
        { label: "Open settings", group: "Navigate", icon: <Settings /> },
        { label: "View profile", group: "Navigate", icon: <User /> },
      ]}
    />
  );
}
