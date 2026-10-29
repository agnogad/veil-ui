import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

export function DrawerRight() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open notifications</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You have 3 unread notifications from this week.
          </DrawerDescription>
        </DrawerHeader>
        <ul className="flex flex-col gap-3 text-sm">
          <li className="rounded-md border p-3">Your invoice was paid.</li>
          <li className="rounded-md border p-3">New comment on “Design tokens”.</li>
          <li className="rounded-md border p-3">Weekly digest is ready.</li>
        </ul>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Mark all as read</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerLeft() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open menu</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Workspace</DrawerTitle>
          <DrawerDescription>Jump to a section.</DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 text-sm">
          <a className="rounded-md px-2 py-1.5 hover:bg-accent" href="#overview">
            Overview
          </a>
          <a className="rounded-md px-2 py-1.5 hover:bg-accent" href="#members">
            Members
          </a>
          <a className="rounded-md px-2 py-1.5 hover:bg-accent" href="#billing">
            Billing
          </a>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerForm() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>New project</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New project</DrawerTitle>
          <DrawerDescription>
            Give your project a name. You can change it later.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-2">
          <Label htmlFor="drawer-project-name">Project name</Label>
          <Input id="drawer-project-name" placeholder="Veil UI" />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button type="submit">Create project</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
