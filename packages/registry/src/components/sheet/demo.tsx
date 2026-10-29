import { Button } from "../button/index";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./index";

export function SheetRight() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Share</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Share this document</SheetTitle>
          <SheetDescription>
            Anyone with the link can view this document.
          </SheetDescription>
        </SheetHeader>
        <p className="rounded-md border bg-muted/40 p-3 text-sm break-all">
          https://veil-ui.dev/d/9f2a
        </p>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Copy link</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function SheetBottom() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open actions</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
          <SheetDescription>Choose what to do with this file.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-2 sm:grid-cols-3">
          <Button variant="outline">Download</Button>
          <Button variant="outline">Rename</Button>
          <Button variant="outline">Move</Button>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function SheetLeft() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Help</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Help center</SheetTitle>
          <SheetDescription>Search the documentation.</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="rounded-md border p-3">Getting started</li>
          <li className="rounded-md border p-3">Theming</li>
          <li className="rounded-md border p-3">CLI reference</li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
