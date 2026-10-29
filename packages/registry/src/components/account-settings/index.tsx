"use client";

import { Bell, Lock, User } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Switch } from "../switch/index";

const sections = [
  { id: "profile", label: "Profile", icon: <User /> },
  { id: "security", label: "Security", icon: <Lock /> },
  { id: "notifications", label: "Notifications", icon: <Bell /> },
] as const;

type SectionId = (typeof sections)[number]["id"];

interface AccountSettingsProps extends React.ComponentProps<"div"> {
  defaultSection?: SectionId;
  email?: string;
  name?: string;
}

function AccountSettings({
  className,
  defaultSection = "profile",
  email = "ada@example.com",
  name = "Ada Lovelace",
  ...props
}: AccountSettingsProps) {
  const [section, setSection] = useState<SectionId>(defaultSection);
  const [twoFactor, setTwoFactor] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);

  return (
    <div
      data-slot="account-settings"
      className={cn("grid w-full max-w-2xl gap-5 sm:grid-cols-[180px_1fr]", className)}
      {...props}
    >
      <nav aria-label="Settings sections" className="grid content-start gap-1">
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={section === item.id ? "page" : undefined}
            onClick={() => setSection(item.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
              section === item.id
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/60",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="rounded-lg border bg-background p-5">
        {section === "profile" ? (
          <div className="grid gap-4">
            <h2 className="text-sm font-semibold">Profile</h2>
            <div className="grid gap-2">
              <Label htmlFor="settings-name">Name</Label>
              <Input id="settings-name" defaultValue={name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="settings-email">Email</Label>
              <Input id="settings-email" type="email" defaultValue={email} />
            </div>
            <div>
              <Button size="sm">Save profile</Button>
            </div>
          </div>
        ) : null}
        {section === "security" ? (
          <div className="grid gap-4">
            <h2 className="text-sm font-semibold">Security</h2>
            <div className="grid gap-2">
              <Label htmlFor="settings-password">New password</Label>
              <Input id="settings-password" type="password" />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border p-3">
              <div className="text-sm">
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">
                  Require a code from your authenticator app.
                </p>
              </div>
              <Switch
                aria-label="Two-factor authentication"
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
              />
            </div>
            <div>
              <Button size="sm">Update security</Button>
            </div>
          </div>
        ) : null}
        {section === "notifications" ? (
          <div className="grid gap-4">
            <h2 className="text-sm font-semibold">Notifications</h2>
            <div className="flex items-center justify-between gap-3 rounded-md border p-3">
              <div className="text-sm">
                <p className="font-medium">Product updates</p>
                <p className="text-xs text-muted-foreground">
                  Monthly changelog and new components.
                </p>
              </div>
              <Switch
                aria-label="Product updates"
                checked={productUpdates}
                onCheckedChange={setProductUpdates}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { AccountSettings };
export type { AccountSettingsProps, SectionId };
