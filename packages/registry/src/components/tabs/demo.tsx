"use client";

import { CreditCard, Settings, User } from "lucide-react";

import { Input } from "../input/index";
import { Label } from "../label/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

export function TabsBasic() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-3 pt-2">
        <div className="grid gap-1.5">
          <Label htmlFor="tabs-name">Name</Label>
          <Input id="tabs-name" defaultValue="Ada Lovelace" />
        </div>
        <p className="text-sm text-muted-foreground">
          This name is visible to your team.
        </p>
      </TabsContent>
      <TabsContent value="password" className="space-y-3 pt-2">
        <div className="grid gap-1.5">
          <Label htmlFor="tabs-password">Current password</Label>
          <Input id="tabs-password" type="password" />
        </div>
        <p className="text-sm text-muted-foreground">
          Use at least 12 characters.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function TabsWithIcons() {
  return (
    <Tabs defaultValue="profile" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="profile">
          <User /> Profile
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard /> Billing
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings /> Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="pt-2 text-sm text-muted-foreground">
        Manage your public profile and avatar.
      </TabsContent>
      <TabsContent value="billing" className="pt-2 text-sm text-muted-foreground">
        Invoices, payment methods and usage.
      </TabsContent>
      <TabsContent value="settings" className="pt-2 text-sm text-muted-foreground">
        Notifications, API keys and integrations.
      </TabsContent>
    </Tabs>
  );
}

export function TabsVertical() {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex w-full max-w-md flex-row gap-4"
    >
      <TabsList className="h-fit flex-col items-stretch">
        <TabsTrigger value="general" className="justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="members" className="justify-start">
          Members
        </TabsTrigger>
        <TabsTrigger value="advanced" className="justify-start">
          Advanced
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 text-sm text-muted-foreground">
        <TabsContent value="general" className="pt-1">
          Project name, region and visibility.
        </TabsContent>
        <TabsContent value="members" className="pt-1">
          Invite teammates and manage roles.
        </TabsContent>
        <TabsContent value="advanced" className="pt-1">
          Transfer ownership or delete the project.
        </TabsContent>
      </div>
    </Tabs>
  );
}
