<script setup lang="ts">
import { Bell, Lock, Palette, Trash2, User } from "lucide-vue-next";
import { reactive } from "vue";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const navItems = [
  { id: "profile", label: "Profile", icon: User, active: true },
  { id: "notifications", label: "Notifications", icon: Bell, active: false },
  { id: "appearance", label: "Appearance", icon: Palette, active: false },
  { id: "security", label: "Security", icon: Lock, active: false },
];

const notifications = reactive([
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
]);
</script>

<template>
  <div
    data-slot="settings-page"
    :class="
      cn(
        'mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]',
        props.class,
      )
    "
  >
    <aside class="min-w-0 lg:sticky lg:top-8 lg:self-start">
      <nav aria-label="Settings" class="rounded-lg border p-2">
        <div class="grid gap-1">
          <p class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Account
          </p>
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            :aria-current="item.active ? 'page' : undefined"
            :class="
              cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                item.active
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground',
              )
            "
          >
            <component :is="item.icon" class="size-4" aria-hidden="true" />
            {{ item.label }}
          </a>
        </div>
      </nav>
    </aside>

    <div class="min-w-0 space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Settings</h1>
        <p class="text-sm text-muted-foreground">
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
        <CardContent class="space-y-5">
          <div class="flex items-center gap-4">
            <Avatar class="size-14 text-base">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div class="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Change avatar</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <Label for="settings-name">Full name</Label>
              <Input id="settings-name" model-value="Mira Chen" />
            </div>
            <div class="space-y-1.5">
              <Label for="settings-handle">Handle</Label>
              <Input id="settings-handle" model-value="@mirachen" />
            </div>
            <div class="space-y-1.5 sm:col-span-2">
              <Label for="settings-email">Email</Label>
              <Input
                id="settings-email"
                type="email"
                model-value="mira@acme.dev"
              />
              <p class="text-xs text-muted-foreground">
                We only use this address for account notifications.
              </p>
            </div>
            <div class="space-y-1.5 sm:col-span-2">
              <Label for="settings-bio">Bio</Label>
              <Textarea
                id="settings-bio"
                model-value="Product lead at Acme. Building calm tools for busy teams."
                :rows="3"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="justify-end gap-2 border-t pt-4">
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
        <CardContent class="divide-y">
          <div
            v-for="item in notifications"
            :key="item.label"
            class="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p class="text-sm font-medium">{{ item.label }}</p>
              <p class="text-xs text-muted-foreground">
                {{ item.description }}
              </p>
            </div>
            <Switch v-model="item.checked" :aria-label="item.label" />
          </div>
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
          <div
            class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
          >
            <div>
              <p class="text-sm font-medium">Delete account</p>
              <p class="text-xs text-muted-foreground">
                This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 aria-hidden="true" />
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
