"use client";

import { useState } from "react";

import { Input } from "../input/index";
import { Label } from "../label/index";
import { ExpandableSection } from "./index";

export function ExpandableSectionBasic() {
  return (
    <ExpandableSection
      title="Advanced settings"
      description="Retries, timeouts and cache behaviour."
      className="max-w-lg"
    >
      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="expandable-retries">Max retries</Label>
          <Input id="expandable-retries" defaultValue="3" inputMode="numeric" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="expandable-timeout">Timeout (ms)</Label>
          <Input id="expandable-timeout" defaultValue="5000" inputMode="numeric" />
        </div>
      </div>
    </ExpandableSection>
  );
}

export function ExpandableSectionDefaultOpen() {
  return (
    <ExpandableSection
      title="Billing address"
      description="Used on every invoice."
      defaultOpen
      className="max-w-lg"
    >
      <p>221B Baker Street, London, NW1 6XE, United Kingdom</p>
    </ExpandableSection>
  );
}

export function ExpandableSectionDisabled() {
  const [open, setOpen] = useState(false);

  return (
    <ExpandableSection
      title="Locked section"
      description="Upgrade your plan to edit these settings."
      open={open}
      onOpenChange={setOpen}
      disabled
      className="max-w-lg"
    >
      <p>Read-only content.</p>
    </ExpandableSection>
  );
}
