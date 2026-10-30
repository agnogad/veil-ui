<script setup lang="ts">
import { cn } from "@/lib/utils";

import { chartColors } from "@/components/ui/chart";

interface ChartLegendItem {
  label: string;
  color?: string;
}

const props = withDefaults(
  defineProps<{
    items: ChartLegendItem[];
    label?: string;
    class?: string;
  }>(),
  { label: "Legend" },
);
</script>

<template>
  <ul
    data-slot="chart-legend"
    :aria-label="label"
    :class="cn('flex flex-wrap items-center gap-x-4 gap-y-1 text-xs', props.class)"
  >
    <li
      v-for="(item, index) in items"
      :key="item.label"
      class="flex items-center gap-1.5"
    >
      <span
        class="size-2 rounded-[2px]"
        :style="{ backgroundColor: item.color ?? chartColors[index % chartColors.length] }"
        aria-hidden="true"
      />
      <span class="text-muted-foreground">{{ item.label }}</span>
    </li>
  </ul>
</template>
