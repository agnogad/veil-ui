<script setup lang="ts">
import { computed } from "vue";

import {
  ChartContainer,
  ChartLegend,
  seriesColor,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    data: Array<Record<string, string | number>>;
    config: ChartConfig;
    xKey: string;
    series?: string[];
    height?: number;
    class?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    stacked?: boolean;
  }>(),
  {
    height: 300,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    stacked: false,
  },
);

const width = 600;
const padding = { top: 8, right: 8, bottom: 24, left: 44 };

const keys = computed(() => props.series ?? Object.keys(props.config));

function value(row: Record<string, string | number>, key: string) {
  const next = Number(row[key]);
  return Number.isFinite(next) ? next : 0;
}

const geometry = computed(() => {
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = props.height - padding.top - padding.bottom;
  const totals = props.data.map((row) =>
    props.stacked
      ? keys.value.reduce((sum, key) => sum + value(row, key), 0)
      : Math.max(...keys.value.map((key) => value(row, key)), 0),
  );
  const max = Math.max(...totals, 1);
  const step = plotWidth / Math.max(props.data.length - 1, 1);

  const x = (index: number) => padding.left + step * index;
  const y = (amount: number) =>
    padding.top + plotHeight - (amount / max) * plotHeight;

  const series = keys.value.map((key, index) => {
    const base = props.data.map(() => 0);
    const points = props.data.map((row, rowIndex) => {
      const amount = value(row, key);
      const start = base[rowIndex]!;
      base[rowIndex] = start + amount;
      return {
        x: x(rowIndex),
        y: y(props.stacked ? start + amount : amount),
        value: amount,
        label: row[props.xKey],
      };
    });
    const line = points
      .map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"}${point.x},${point.y}`)
      .join(" ");
    const last = points[points.length - 1];
    const first = points[0];
    const area =
      last && first
        ? `${line} L${last.x},${padding.top + plotHeight} L${first.x},${padding.top + plotHeight} Z`
        : "";
    return {
      key,
      label: props.config[key]?.label ?? key,
      color: seriesColor(props.config, key, index),
      line,
      area,
      points,
    };
  });

  return {
    plotHeight,
    step,
    x,
    series,
    grid: [0, 0.25, 0.5, 0.75, 1].map(
      (ratio) => padding.top + plotHeight * ratio,
    ),
  };
});

const legend = computed(() =>
  geometry.value.series.map((entry) => ({
    dataKey: entry.key,
    value: entry.label,
    color: entry.color,
  })),
);
</script>

<template>
  <ChartContainer :config="config" :height="height" :class="cn(props.class)">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      class="size-full"
      role="img"
      :aria-label="`${keys.join(', ')} chart`"
    >
      <title>{{ keys.join(", ") }} chart</title>
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
      <g v-for="entry in geometry.series" :key="entry.key">
        <path :d="entry.area" :fill="entry.color" fill-opacity="0.18" />
        <path
          :d="entry.line"
          fill="none"
          :stroke="entry.color"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          v-for="(point, index) in entry.points"
          :key="index"
          :cx="point.x"
          :cy="point.y"
          r="2"
          :fill="entry.color"
        >
          <title v-if="showTooltip">{{ point.label }}: {{ point.value }}</title>
        </circle>
      </g>
      <g class="fill-muted-foreground" font-size="12">
        <text
          v-for="(row, index) in data"
          :key="String(row[xKey])"
          :x="geometry.x(index)"
          :y="height - 6"
          text-anchor="middle"
        >
          {{ row[xKey] }}
        </text>
      </g>
    </svg>
  </ChartContainer>
  <ChartLegend v-if="showLegend" :payload="legend" />
</template>
