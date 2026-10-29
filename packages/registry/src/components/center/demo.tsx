"use client";

import { Inbox } from "lucide-react";

import { Button } from "../button/index";
import { Center } from "./index";

export function CenterBasic() {
  return (
    <Center className="h-32 w-full rounded-md border border-dashed">
      <span className="text-sm text-muted-foreground">Centered content</span>
    </Center>
  );
}

export function CenterFullHeight() {
  return (
    <Center className="h-40 w-full rounded-md border bg-muted/20">
      <div className="text-center">
        <p className="text-sm font-medium">Sign in to continue</p>
        <Button size="sm" className="mt-3">
          Sign in
        </Button>
      </div>
    </Center>
  );
}

export function CenterEmpty() {
  return (
    <Center className="h-40 w-full flex-col gap-2 rounded-md border border-dashed">
      <Inbox className="size-5 text-muted-foreground" aria-hidden />
      <p className="text-sm text-muted-foreground">Nothing here yet</p>
    </Center>
  );
}
