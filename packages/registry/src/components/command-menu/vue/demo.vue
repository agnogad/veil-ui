<script setup lang="ts">
import { Calendar, Settings, User } from "lucide-vue-next";

import { CommandMenu } from "./index";

const items = [
  { label: "Calendar", icon: Calendar, shortcut: "G C" },
  { label: "Profile", icon: User, shortcut: "G P" },
  { label: "Settings", icon: Settings, shortcut: "G S" },
];
</script>

<template>
  <CommandMenu :items="items">
    <template #trigger>
      <button
        type="button"
        class="rounded-md border px-3 py-1.5 text-sm font-medium"
      >
        Open command menu
      </button>
    </template>
  </CommandMenu>
</template>
