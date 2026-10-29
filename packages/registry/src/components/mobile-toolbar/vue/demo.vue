<script setup lang="ts">
import { ArrowDownUp, Calendar, Filter, LayoutGrid, List } from "lucide-vue-next";
import { computed, ref } from "vue";

import { MobileToolbar } from "./index";
import type { MobileToolbarItem } from "./index";

const view = ref<"grid" | "list">("grid");

const viewItems = computed<MobileToolbarItem[]>(() => [
  {
    label: "Grid",
    icon: LayoutGrid,
    active: view.value === "grid",
    onClick: () => (view.value = "grid"),
  },
  {
    label: "List",
    icon: List,
    active: view.value === "list",
    onClick: () => (view.value = "list"),
  },
]);
</script>

<template>
  <div class="mx-auto w-full max-w-sm overflow-hidden rounded-lg border">
    <MobileToolbar
      aria-label="List tools"
      :items="[
        { label: 'Filter', icon: Filter, badge: 2 },
        { label: 'Sort', icon: ArrowDownUp },
        { label: 'Date', icon: Calendar },
      ]"
    />
    <MobileToolbar aria-label="View options" :items="viewItems" />
    <p class="px-4 py-3 text-sm text-muted-foreground">
      Showing {{ view }} view
    </p>
  </div>
</template>
