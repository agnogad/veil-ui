<script setup lang="ts">
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";

import MobileFilterSheet from "./MobileFilterSheet.vue";
import type { MobileFilterGroup, MobileFilterValue } from "./types";

const open = ref(false);
const applied = ref<MobileFilterValue>({});

const groups: MobileFilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "design", label: "Design" },
      { value: "engineering", label: "Engineering" },
      { value: "marketing", label: "Marketing" },
    ],
  },
  {
    id: "price",
    label: "Price",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
];

const count = computed(() =>
  Object.values(applied.value).reduce(
    (total, values) => total + values.length,
    0,
  ),
);
</script>

<template>
  <div
    class="flex w-full max-w-sm items-center justify-between gap-3 rounded-lg border p-4"
  >
    <div class="text-sm">
      <p class="font-medium">Results</p>
      <p class="text-xs text-muted-foreground">
        {{ count }} filter{{ count === 1 ? "" : "s" }} applied
      </p>
    </div>
    <Button variant="outline" @click="open = true">Filters</Button>
    <MobileFilterSheet
      v-model:open="open"
      :groups="groups"
      :value="applied"
      @apply="applied = $event"
      @reset="applied = {}"
    />
  </div>
</template>
