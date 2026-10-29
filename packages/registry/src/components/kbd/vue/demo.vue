<script setup lang="ts">
import { Search } from "lucide-vue-next";

import { Kbd } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>

    <p class="text-sm text-muted-foreground">
      Press <Kbd>Shift</Kbd> + <Kbd>?</Kbd> to open the shortcut menu.
    </p>

    <div
      class="flex w-full max-w-xs items-center justify-between rounded-md border px-3 py-2 text-sm"
    >
      <span class="flex items-center gap-2 text-muted-foreground">
        <Search class="size-4" aria-hidden="true" /> Search
      </span>
      <span class="flex items-center gap-0.5">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </div>
  </div>
</template>
