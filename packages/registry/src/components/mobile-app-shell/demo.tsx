import { Bell, Plus, Search } from "lucide-react";

import { Button } from "../button/index";
import { MobileAppShell } from "./index";
import { MobileBottomBar } from "../mobile-bottom-bar/index";
import { MobileFab } from "../mobile-fab/index";
import { MobileHeader } from "../mobile-header/index";

const items = ["Inbox", "Today", "Upcoming", "Completed"];

function TaskList() {
  return (
    <ul className="divide-y">
      {items.map((item) => (
        <li key={item} className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-medium">{item}</span>
          <span className="text-xs text-muted-foreground">{item.length}</span>
        </li>
      ))}
    </ul>
  );
}

export function MobileAppShellBasic() {
  return (
    <MobileAppShell
      header={
        <MobileHeader
          title="Tasks"
          subtitle="4 lists"
          actions={
            <Button size="icon" variant="ghost" aria-label="Notifications">
              <Bell />
            </Button>
          }
        />
      }
      footer={
        <MobileBottomBar>
          <Button variant="outline" className="flex-1">
            <Search aria-hidden /> Search
          </Button>
          <Button className="flex-1">
            <Plus aria-hidden /> New task
          </Button>
        </MobileBottomBar>
      }
    >
      <TaskList />
    </MobileAppShell>
  );
}

export function MobileAppShellWithFab() {
  return (
    <MobileAppShell
      header={<MobileHeader title="Notes" subtitle="All notes" />}
      floating={
        <MobileFab className="absolute bottom-5 right-5" aria-label="New note">
          <Plus />
        </MobileFab>
      }
    >
      <div className="space-y-3 p-4">
        {["Design tokens", "Release checklist", "Interview notes"].map(
          (note) => (
            <div key={note} className="rounded-lg border p-3 text-sm">
              <p className="font-medium">{note}</p>
              <p className="text-xs text-muted-foreground">
                Updated 2 hours ago
              </p>
            </div>
          ),
        )}
      </div>
    </MobileAppShell>
  );
}
