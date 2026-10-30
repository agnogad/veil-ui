<script setup lang="ts">
import { seriesColor, type ChartConfig } from "./variants";
import { useChart } from "./use-chart";

interface TooltipPayloadItem {
  dataKey?: string | number;
  name?: string;
  value?: string | number;
  color?: string;
}

const props = withDefaults(
  defineProps<{
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string | number;
    hideLabel?: boolean;
    config?: ChartConfig;
  }>(),
  { hideLabel: false },
);

const chart = useChart();
const resolveConfig = () => props.config ?? chart;

function colorFor(item: TooltipPayloadItem, index: number) {
  const key = String(item.dataKey ?? item.name ?? index);
  return item.color ?? seriesColor(resolveConfig(), key, index);
}

function labelFor(item: TooltipPayloadItem, index: number) {
  const key = String(item.dataKey ?? item.name ?? index);
  return resolveConfig()[key]?.label ?? item.name ?? key;
}
</script>

<template>
  <div
    v-if="active && payload?.length"
    class="grid min-w-32 gap-1.5 rounded-md border bg-popover px-2.5 py-2 text-xs text-popover-foreground shadow-md"
  >
    <p v-if="!hideLabel && label !== undefined" class="font-medium">
      {{ label }}
    </p>
    <div
      v-for="(item, index) in payload"
      :key="String(item.dataKey ?? item.name ?? index)"
      class="flex items-center gap-2"
    >
      <span
        class="size-2 shrink-0 rounded-[2px]"
        :style="{ backgroundColor: colorFor(item, index) }"
        aria-hidden="true"
      />
      <span class="text-muted-foreground">{{ labelFor(item, index) }}</span>
      <span class="ml-auto font-medium tabular-nums">
        {{ typeof item.value === "number" ? item.value.toLocaleString() : item.value }}
      </span>
    </div>
  </div>
</template>
