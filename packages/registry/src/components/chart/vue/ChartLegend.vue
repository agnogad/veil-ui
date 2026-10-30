<script setup lang="ts">
import { seriesColor, type ChartConfig } from "./variants";
import { useChart } from "./use-chart";

interface ChartLegendItem {
  value?: string | number;
  dataKey?: string | number;
  color?: string;
  payload?: { value?: string | number; dataKey?: string | number };
}

const props = defineProps<{
  payload?: ChartLegendItem[];
  config?: ChartConfig;
}>();

const chart = useChart();
const resolveConfig = () => props.config ?? chart;

function keyFor(item: ChartLegendItem, index: number) {
  return String(item.dataKey ?? item.payload?.dataKey ?? item.value ?? index);
}

function colorFor(item: ChartLegendItem, index: number) {
  const key = keyFor(item, index);
  return item.color ?? seriesColor(resolveConfig(), key, index);
}

function labelFor(item: ChartLegendItem, index: number) {
  const key = keyFor(item, index);
  return resolveConfig()[key]?.label ?? item.value ?? key;
}
</script>

<template>
  <ul
    v-if="payload?.length"
    class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2 text-xs"
  >
    <li
      v-for="(item, index) in payload"
      :key="keyFor(item, index)"
      class="flex items-center gap-1.5"
    >
      <span
        class="size-2 rounded-[2px]"
        :style="{ backgroundColor: colorFor(item, index) }"
        aria-hidden="true"
      />
      <span class="text-muted-foreground">{{ labelFor(item, index) }}</span>
    </li>
  </ul>
</template>
