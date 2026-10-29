<script setup lang="ts">
import { ref } from "vue";

import { NavigationDrawer } from "./index";

const open = ref(false);

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Components", href: "#components" },
  { label: "Settings", href: "#settings" },
];
</script>

<template>
  <NavigationDrawer v-model:open="open" title="Navigation">
    <template #trigger>
      <button
        type="button"
        class="rounded-md border px-3 py-1.5 text-sm font-medium"
      >
        Open drawer
      </button>
    </template>
    <nav aria-label="Drawer" class="grid gap-1 text-sm">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="rounded-md px-2 py-1.5 hover:bg-accent"
      >
        {{ link.label }}
      </a>
    </nav>
  </NavigationDrawer>
</template>
