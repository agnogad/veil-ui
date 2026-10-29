"use client";

import { Label } from "../label/index";
import { PasswordInput } from "./index";

export function PasswordInputBasic() {
  return (
    <PasswordInput
      placeholder="Enter your password"
      autoComplete="current-password"
      aria-label="Password"
      className="max-w-sm"
    />
  );
}

export function PasswordInputWithLabel() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="password">Password</Label>
      <PasswordInput
        id="password"
        placeholder="At least 12 characters"
        autoComplete="new-password"
      />
      <p className="text-sm text-muted-foreground">
        Use a mix of letters, numbers and symbols.
      </p>
    </div>
  );
}

export function PasswordInputDisabled() {
  return (
    <PasswordInput
      disabled
      defaultValue="veil-secret"
      aria-label="Password"
      className="max-w-sm"
    />
  );
}
