"use client";

import { useState } from "react";

import { Label } from "../label/index";
import { Checkbox } from "./index";

export function CheckboxBasic() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}

export function CheckboxIndeterminate() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="select-all" checked="indeterminate" />
      <Label htmlFor="select-all">Select all</Label>
    </div>
  );
}

export function CheckboxDisabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-checkbox" disabled />
      <Label htmlFor="disabled-checkbox">Unavailable option</Label>
    </div>
  );
}
