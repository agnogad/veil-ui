<script setup lang="ts">
import { CreditCard, FileText, Settings, Users } from "lucide-vue-next";

import { CommandPalette } from "./index";

const items = [
  {
    label: "Documentation",
    group: "Navigate",
    icon: FileText,
    shortcut: "G D",
  },
  { label: "Settings", group: "Navigate", icon: Settings, shortcut: "G S" },
  { label: "Invite teammate", group: "Actions", icon: Users, shortcut: "I T" },
  { label: "Manage billing", group: "Actions", icon: CreditCard },
];
</script>

<template>
  <CommandPalette :items="items">
    <template #trigger>
      <button
        type="button"
        class="rounded-md border px-3 py-1.5 text-sm font-medium"
      >
        Search commands
      </button>
    </template>
  </CommandPalette>
</template>
