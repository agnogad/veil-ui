"use client";

import { useState } from "react";

import { HamburgerMenu } from "./index";

export function HamburgerMenuBasic() {
  return <HamburgerMenu />;
}

export function HamburgerMenuControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <HamburgerMenu open={open} onOpenChange={setOpen} />
      <span>{open ? "Menu is open" : "Menu is closed"}</span>
    </div>
  );
}
