import { CreditCard, FileText, Settings, Users } from "lucide-react";

import { CommandPalette } from "./index";

export function CommandPaletteBasic() {
  return (
    <CommandPalette
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Press ⌘K
        </button>
      }
      items={[
        { label: "Search docs", shortcut: "⌘K" },
        { label: "Go to settings", shortcut: "G S" },
        { label: "Copy install command" },
      ]}
    />
  );
}

export function CommandPaletteGrouped() {
  return (
    <CommandPalette
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Search commands
        </button>
      }
      items={[
        {
          label: "Documentation",
          group: "Navigate",
          icon: <FileText />,
          shortcut: "G D",
        },
        {
          label: "Settings",
          group: "Navigate",
          icon: <Settings />,
          shortcut: "G S",
        },
        {
          label: "Invite teammate",
          group: "Actions",
          icon: <Users />,
          shortcut: "I T",
        },
        {
          label: "Manage billing",
          group: "Actions",
          icon: <CreditCard />,
        },
      ]}
    />
  );
}
