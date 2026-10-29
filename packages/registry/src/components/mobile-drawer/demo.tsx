import { Bell, Home, Settings } from "lucide-react";

import { Button } from "../button/index";
import {
  MobileDrawer,
  MobileDrawerClose,
  MobileDrawerContent,
  MobileDrawerDescription,
  MobileDrawerFooter,
  MobileDrawerHeader,
  MobileDrawerTitle,
  MobileDrawerTrigger,
} from "./index";

export function MobileDrawerBasic() {
  return (
    <MobileDrawer>
      <MobileDrawerTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </MobileDrawerTrigger>
      <MobileDrawerContent side="left">
        <MobileDrawerHeader>
          <MobileDrawerTitle>Workspace</MobileDrawerTitle>
          <MobileDrawerDescription>Jump to a section.</MobileDrawerDescription>
        </MobileDrawerHeader>
        <nav className="flex flex-col gap-1 text-sm">
          <a className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-accent" href="#home">
            <Home className="size-4" aria-hidden /> Home
          </a>
          <a className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-accent" href="#alerts">
            <Bell className="size-4" aria-hidden /> Alerts
          </a>
          <a className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-accent" href="#settings">
            <Settings className="size-4" aria-hidden /> Settings
          </a>
        </nav>
        <MobileDrawerFooter>
          <MobileDrawerClose asChild>
            <Button variant="outline">Close</Button>
          </MobileDrawerClose>
        </MobileDrawerFooter>
      </MobileDrawerContent>
    </MobileDrawer>
  );
}

export function MobileDrawerRight() {
  return (
    <MobileDrawer>
      <MobileDrawerTrigger asChild>
        <Button variant="secondary">Open filters</Button>
      </MobileDrawerTrigger>
      <MobileDrawerContent side="right">
        <MobileDrawerHeader>
          <MobileDrawerTitle>Filters</MobileDrawerTitle>
          <MobileDrawerDescription>
            Narrow down the results.
          </MobileDrawerDescription>
        </MobileDrawerHeader>
        <p className="text-sm text-muted-foreground">
          Filter controls go here on small screens.
        </p>
        <MobileDrawerFooter>
          <MobileDrawerClose asChild>
            <Button>Apply</Button>
          </MobileDrawerClose>
        </MobileDrawerFooter>
      </MobileDrawerContent>
    </MobileDrawer>
  );
}
