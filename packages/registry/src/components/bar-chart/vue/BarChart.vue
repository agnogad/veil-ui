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
  const groupWidth = plotWidth / Math.max(props.data.length, 1);
  const barWidth = (groupWidth * 0.62) / Math.max(keys.value.length, 1);

  const series = keys.value.map((key, index) => ({
    key,
    label: props.config[key]?.label ?? key,
    color: seriesColor(props.config, key, index),
  }));

  const groups = props.data.map((row, rowIndex) => {
    let stack = 0;
    const bars = series.map((entry, seriesIndex) => {
      const amount = value(row, entry.key);
      const start = props.stacked ? stack : 0;
      stack += amount;
      const barHeight =
        ((props.stacked ? amount : amount) / max) * plotHeight;
      const y = props.stacked
        ? padding.top + plotHeight - ((start + amount) / max) * plotHeight
        : padding.top + plotHeight - barHeight;
      return {
        ...entry,
        x:
          padding.left +
          groupWidth * rowIndex +
          (groupWidth - barWidth * series.length) / 2 +
          barWidth * seriesIndex,
        y,
        width: Math.max(barWidth - 4, 2),
        height: Math.max(barHeight, 0),
        value: amount,
      };
    });
    return { label: row[props.xKey], bars, x: padding.left + groupWidth * rowIndex + groupWidth / 2 };
  });

  return {
    plotHeight,
    series,
    groups,
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
      <g v-for="(group, groupIndex) in geometry.groups" :key="groupIndex">
        <rect
          v-for="bar in group.bars"
          :key="bar.key"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          :fill="bar.color"
          rx="4"
        >
          <title v-if="showTooltip">{{ group.label }} · {{ bar.label }}: {{ bar.value }}</title>
        </rect>
        <text
          :x="group.x"
          :y="height - 6"
          text-anchor="middle"
          class="fill-muted-foreground"
          font-size="12"
        >
          {{ group.label }}
        </text>
      </g>
    </svg>
  </ChartContainer>
  <ChartLegend v-if="showLegend" :payload="legend" />
</template>
