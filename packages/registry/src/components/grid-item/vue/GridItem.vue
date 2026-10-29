<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const colSpans = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
} as const;

const rowSpans = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
} as const;

const props = withDefaults(
  defineProps<{
    colSpan?: keyof typeof colSpans;
    rowSpan?: keyof typeof rowSpans;
    class?: string;
  }>(),
  { colSpan: 1, rowSpan: 1 },
);

const classes = computed(() =>
  cn("min-w-0", colSpans[props.colSpan], rowSpans[props.rowSpan], props.class),
);
</script>

<template>
  <div
    data-slot="grid-item"
    :data-col-span="colSpan"
    :data-row-span="rowSpan"
    :class="classes"
  >
    <slot />
  </div>
</template>
