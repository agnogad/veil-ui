"use client";

import { Input } from "../input/index";
import { Label } from "./index";

export function LabelBasic() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" type="email" placeholder="you@example.com" />
    </div>
  );
}

export function LabelRequired() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="label-project">
        Project name <span className="text-destructive">*</span>
      </Label>
      <Input id="label-project" required placeholder="acme-web" />
    </div>
  );
}

export function LabelDisabled() {
  return (
    <div className="group grid w-full max-w-sm gap-1.5" data-disabled="true">
      <Label htmlFor="label-disabled">API key</Label>
      <Input id="label-disabled" disabled defaultValue="veil_sk_••••" />
    </div>
  );
}
