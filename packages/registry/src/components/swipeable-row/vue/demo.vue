<script setup lang="ts">
import { Archive, Trash2 } from "lucide-vue-next";
import { ref } from "vue";

import { SwipeableRow } from "./index";

const items = ref(["Invoice #1042", "Weekly digest", "Design review notes"]);
</script>

<template>
  <div class="w-full max-w-sm overflow-hidden rounded-lg border bg-background">
    <SwipeableRow
      v-for="item in items"
      :key="item"
      class="border-b last:border-b-0"
      :actions="[
        {
          label: 'Archive',
          icon: Archive,
          onClick: () => {},
        },
        {
          label: 'Delete',
          icon: Trash2,
          destructive: true,
          onClick: () =>
            (items = items.filter((entry) => entry !== item)),
        },
      ]"
    >
      <div class="flex items-center justify-between px-4 py-3 text-sm">
        <span class="font-medium">{{ item }}</span>
        <span class="text-xs text-muted-foreground">2 actions</span>
      </div>
    </SwipeableRow>
  </div>
</template>
