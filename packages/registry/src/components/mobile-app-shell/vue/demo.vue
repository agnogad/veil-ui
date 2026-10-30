<script setup lang="ts">
import { MobileAppShell } from "./index";
</script>

<template>
  <MobileAppShell class="mx-auto">
    <template #header>
      <header class="flex h-12 shrink-0 items-center justify-between border-b px-4">
        <span class="text-sm font-semibold">Discover</span>
        <span class="text-xs text-muted-foreground">Today</span>
      </header>
    </template>

    <div class="grid gap-2 p-4">
      <div
        v-for="index in 8"
        :key="index"
        class="rounded-lg border bg-card p-4 text-sm"
      >
        Feed item {{ index }}
      </div>
    </div>

    <template #footer>
      <nav class="flex h-14 shrink-0 items-center justify-around border-t text-xs text-muted-foreground">
        <span class="font-medium text-foreground">Home</span>
        <span>Search</span>
        <span>Profile</span>
      </nav>
    </template>
  </MobileAppShell>
</template>
