import { Bell, Lock, Palette, Trash2, User } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "../sidebar/index";
import { SidebarLayout } from "../sidebar-layout/index";
import { Switch } from "../switch/index";
import { Textarea } from "../textarea/index";

function SettingsPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <SidebarLayout
      data-slot="settings-page"
      className={cn(className)}
      sidebar={
        <nav aria-label="Settings" className="rounded-lg border p-2">
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarItem href="#profile" active>
              <User /> Profile
            </SidebarItem>
            <SidebarItem href="#notifications">
              <Bell /> Notifications
            </SidebarItem>
            <SidebarItem href="#appearance">
              <Palette /> Appearance
            </SidebarItem>
            <SidebarItem href="#security">
              <Lock /> Security
            </SidebarItem>
          </SidebarGroup>
        </nav>
      }
      {...props}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your profile and workspace preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This information is visible to people in your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 text-base">
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Change avatar
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="settings-name">Full name</Label>
                <Input id="settings-name" defaultValue="Mira Chen" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-handle">Handle</Label>
                <Input id="settings-handle" defaultValue="@mirachen" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  defaultValue="mira@acme.dev"
                />
                <p className="text-xs text-muted-foreground">
                  We only use this address for account notifications.
                </p>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="settings-bio">Bio</Label>
                <Textarea
                  id="settings-bio"
                  defaultValue="Product lead at Acme. Building calm tools for busy teams."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2 border-t pt-4">
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose which updates you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            {[
              {
                label: "Product updates",
                description: "News about releases and new components.",
                checked: true,
              },
              {
                label: "Weekly digest",
                description: "A summary of workspace activity each Monday.",
                checked: true,
              },
              {
                label: "Mentions",
                description: "When someone mentions you in a comment.",
                checked: true,
              },
              {
                label: "Marketing email",
                description: "Occasional tips and case studies.",
                checked: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  defaultChecked={item.checked}
                  aria-label={item.label}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger zone</CardTitle>
            <CardDescription>
              Deleting your account removes all related data permanently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-xs text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 /> Delete account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}

export { SettingsPage };
