<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    label?: string;
    class?: string;
    showArea?: boolean;
  }>(),
  {
    width: 120,
    height: 32,
    color: "currentColor",
    label: "Trend sparkline",
    showArea: false,
  },
);

const isEmpty = computed(() => props.data.length === 0);

const chart = computed(() => {
  if (props.data.length === 0) {
    return { line: "", area: "" };
  }

  const min = Math.min(...props.data);
  const max = Math.max(...props.data);
  const range = max - min || 1;
  const step = props.data.length > 1 ? props.width / (props.data.length - 1) : 0;

  const points = props.data.map((value, index) => {
    const x = index * step;
    const y = props.height - 2 - ((value - min) / range) * (props.height - 4);
    return `${x},${y}`;
  });

  const line = `M ${points.join(" L ")}`;
  const area = `${line} L ${props.width},${props.height} L 0,${props.height} Z`;

  return { line, area };
});
</script>

<template>
  <span v-if="isEmpty" :class="cn('text-xs text-muted-foreground', props.class)">
    No data
  </span>
  <svg
    v-else
    role="img"
    :aria-label="label"
    :viewBox="`0 0 ${width} ${height}`"
    :class="cn('h-8 w-auto', props.class)"
    :style="{ color }"
  >
    <path
      v-if="showArea"
      :d="chart.area"
      fill="currentColor"
      fill-opacity="0.15"
      stroke="none"
    />
    <path
      :d="chart.line"
      fill="none"
      stroke="currentColor"
      :stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
