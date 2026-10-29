"use client";

import { AccountSettings } from "./index";

export function AccountSettingsBasic() {
  return (
    <AccountSettings className="w-full max-w-2xl rounded-xl border bg-background p-5" />
  );
}

export function AccountSettingsSecurity() {
  return (
    <AccountSettings
      className="w-full max-w-2xl rounded-xl border bg-background p-5"
      defaultSection="security"
    />
  );
}
