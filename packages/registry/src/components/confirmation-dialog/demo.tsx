"use client";

import { useState } from "react";

import { Button } from "../button/index";
import { ConfirmationDialog } from "./index";

export function ConfirmationDialogDestructive() {
  return (
    <ConfirmationDialog
      title="Delete this project?"
      description="All files, deployments and environment variables will be permanently removed."
      confirmLabel="Delete project"
      destructive
      trigger={<Button variant="destructive">Delete project</Button>}
      onConfirm={() => {}}
    />
  );
}

export function ConfirmationDialogConfirm() {
  return (
    <ConfirmationDialog
      title="Publish changes?"
      description="Your changes will go live for every visitor."
      confirmLabel="Publish"
      trigger={<Button>Publish</Button>}
      onConfirm={() => {}}
    />
  );
}

export function ConfirmationDialogControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Discard draft
      </Button>
      <p className="text-sm text-muted-foreground">
        Dialog is {open ? "open" : "closed"}.
      </p>
      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="Discard draft?"
        description="Your unsaved changes will be lost."
        confirmLabel="Discard"
        destructive
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
