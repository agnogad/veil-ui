<script setup lang="ts">
import { Bell, Lock, User } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import type { AccountSettingsProps, SectionId } from "./types";

const props = withDefaults(defineProps<AccountSettingsProps>(), {
  defaultSection: "profile",
  email: "ada@example.com",
  name: "Ada Lovelace",
});

const sections = [
  { id: "profile" as const, label: "Profile", icon: User },
  { id: "security" as const, label: "Security", icon: Lock },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
];

const section = ref<SectionId>(props.defaultSection);
const twoFactor = ref(false);
const productUpdates = ref(true);
const name = ref(props.name);
const email = ref(props.email);
</script>

<template>
  <div
    data-slot="account-settings"
    :class="
      cn(
        'grid w-full max-w-2xl gap-5 sm:grid-cols-[180px_1fr]',
        props.class,
      )
    "
  >
    <nav aria-label="Settings sections" class="grid content-start gap-1">
      <button
        v-for="item in sections"
        :key="item.id"
        type="button"
        :aria-current="section === item.id ? 'page' : undefined"
        :class="
          cn(
            'inline-flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4',
            section === item.id
              ? 'bg-accent font-medium text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/60',
          )
        "
        @click="section = item.id"
      >
        <component :is="item.icon" aria-hidden="true" />
        {{ item.label }}
      </button>
    </nav>

    <div class="rounded-lg border bg-background p-5">
      <div v-if="section === 'profile'" class="grid gap-4">
        <h2 class="text-sm font-semibold">Profile</h2>
        <div class="grid gap-2">
          <Label for="settings-name">Name</Label>
          <Input id="settings-name" v-model="name" />
        </div>
        <div class="grid gap-2">
          <Label for="settings-email">Email</Label>
          <Input id="settings-email" v-model="email" type="email" />
        </div>
        <div>
          <Button size="sm">Save profile</Button>
        </div>
      </div>

      <div v-else-if="section === 'security'" class="grid gap-4">
        <h2 class="text-sm font-semibold">Security</h2>
        <div class="grid gap-2">
          <Label for="settings-password">New password</Label>
          <Input id="settings-password" type="password" />
        </div>
        <div class="flex items-center justify-between gap-3 rounded-md border p-3">
          <div class="text-sm">
            <p class="font-medium">Two-factor authentication</p>
            <p class="text-xs text-muted-foreground">
              Require a code from your authenticator app.
            </p>
          </div>
          <Switch v-model="twoFactor" aria-label="Two-factor authentication" />
        </div>
        <div>
          <Button size="sm">Update security</Button>
        </div>
      </div>

      <div v-else class="grid gap-4">
        <h2 class="text-sm font-semibold">Notifications</h2>
        <div class="flex items-center justify-between gap-3 rounded-md border p-3">
          <div class="text-sm">
            <p class="font-medium">Product updates</p>
            <p class="text-xs text-muted-foreground">
              Monthly changelog and new components.
            </p>
          </div>
          <Switch v-model="productUpdates" aria-label="Product updates" />
        </div>
      </div>
    </div>
  </div>
</template>
