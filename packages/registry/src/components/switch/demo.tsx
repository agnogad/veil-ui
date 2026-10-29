"use client";

import { useState } from "react";

import { Label } from "../label/index";
import { Switch } from "./index";

export function SwitchBasic() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  );
}

export function SwitchSizes() {
  return (
    <div className="flex items-center gap-4">
      <Switch size="sm" aria-label="Small switch" defaultChecked />
      <Switch aria-label="Default switch" defaultChecked />
    </div>
  );
}

export function SwitchDisabled() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="beta" disabled />
      <Label htmlFor="beta">Beta features (unavailable)</Label>
    </div>
  );
}
