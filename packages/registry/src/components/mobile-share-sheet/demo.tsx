"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/index";
import { MobileShareSheet } from "./index";

export function MobileShareSheetBasic() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border p-4">
      <div className="min-w-0 text-sm">
        <p className="font-medium">Design tokens guide</p>
        <p className="truncate text-xs text-muted-foreground">
          https://veil-ui.dev/docs/theming
        </p>
      </div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Share2 aria-hidden /> Share
      </Button>
      <MobileShareSheet
        open={open}
        onOpenChange={setOpen}
        url="https://veil-ui.dev/docs/theming"
        title="Share guide"
      />
    </div>
  );
}

export function MobileShareSheetCustom() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button onClick={() => setOpen(true)}>Share invoice</Button>
      <MobileShareSheet
        open={open}
        onOpenChange={setOpen}
        url="https://acme.dev/invoices/42"
        title="Share invoice"
        targets={[
          { label: "Email", icon: <span aria-hidden>✉️</span> },
          { label: "Copy link" },
        ]}
      />
    </div>
  );
}
