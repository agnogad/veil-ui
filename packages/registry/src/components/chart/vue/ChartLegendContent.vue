<script setup lang="ts">
import ChartLegend from "./ChartLegend.vue";
import { seriesColor } from "./variants";
import { useChart } from "./use-chart";

interface LegendItem {
  value?: string | number;
  dataKey?: string | number;
  color?: string;
  payload?: { value?: string | number; dataKey?: string | number };
}

defineProps<{ payload?: LegendItem[] }>();

const chart = useChart();

function keyFor(item: LegendItem, index: number) {
  return String(item.dataKey ?? item.payload?.dataKey ?? item.value ?? index);
}

function colorFor(item: LegendItem, index: number) {
  const key = keyFor(item, index);
  return item.color ?? seriesColor(chart, key, index);
}

function labelFor(item: LegendItem, index: number) {
  const key = keyFor(item, index);
  return chart[key]?.label ?? item.value ?? key;
}
</script>

<template>
  <ChartLegend
    :payload="
      (payload ?? []).map((item, index) => ({
        ...item,
        color: colorFor(item, index),
        value: labelFor(item, index),
      }))
    "
  />
</template>
