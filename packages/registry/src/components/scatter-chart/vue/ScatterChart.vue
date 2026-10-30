<script setup lang="ts">
import { computed } from "vue";

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
}

const props = withDefaults(
  defineProps<{
    data: ScatterPoint[];
    height?: number;
    class?: string;
    xLabel?: string;
    yLabel?: string;
    color?: string;
    showGrid?: boolean;
    showTooltip?: boolean;
  }>(),
  {
    height: 300,
    xLabel: "x",
    yLabel: "y",
    color: "#6366f1",
    showGrid: true,
    showTooltip: true,
  },
);

const width = 600;
const padding = { top: 8, right: 8, bottom: 24, left: 44 };

const config = computed<ChartConfig>(() => ({
  series: { label: `${props.yLabel} vs ${props.xLabel}`, color: props.color },
}));

const geometry = computed(() => {
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = props.height - padding.top - padding.bottom;
  const maxX = Math.max(...props.data.map((point) => point.x), 1);
  const maxY = Math.max(...props.data.map((point) => point.y), 1);
  const maxZ = Math.max(...props.data.map((point) => point.z ?? 1), 1);

  return {
    points: props.data.map((point) => ({
      ...point,
      cx: padding.left + (point.x / maxX) * plotWidth,
      cy: padding.top + plotHeight - (point.y / maxY) * plotHeight,
      r: 4 + ((point.z ?? maxZ) / maxZ) * 8,
    })),
    grid: [0, 0.25, 0.5, 0.75, 1].map(
      (ratio) => padding.top + plotHeight * ratio,
    ),
    maxX,
    maxY,
  };
});
</script>

<template>
  <ChartContainer :config="config" :height="height" :class="cn(props.class)">
    <svg :viewBox="`0 0 ${width} ${height}`" class="size-full" role="img" :aria-label="`${yLabel} versus ${xLabel} scatter chart`">
      <title>{{ yLabel }} versus {{ xLabel }} scatter chart</title>
      <g v-if="showGrid">
        <line
          v-for="(lineY, index) in geometry.grid"
          :key="index"
          :x1="padding.left"
          :y1="lineY"
          :x2="width - padding.right"
          :y2="lineY"
          stroke="var(--border)"
          stroke-dasharray="3 3"
        />
      </g>
      <circle
        v-for="(point, index) in geometry.points"
        :key="index"
        :cx="point.cx"
        :cy="point.cy"
        :r="point.r"
        :fill="color"
        fill-opacity="0.7"
      >
        <title v-if="showTooltip">{{ xLabel }} {{ point.x }} · {{ yLabel }} {{ point.y }}</title>
      </circle>
      <g class="fill-muted-foreground" font-size="12">
        <text :x="padding.left" :y="height - 6">0</text>
        <text :x="width - padding.right" :y="height - 6" text-anchor="end">{{ xLabel }}</text>
      </g>
    </svg>
  </ChartContainer>
</template>
