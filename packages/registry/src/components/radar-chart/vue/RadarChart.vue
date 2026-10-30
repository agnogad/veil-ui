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
    angleKey: string;
    series?: string[];
    height?: number;
    class?: string;
    showLegend?: boolean;
    showTooltip?: boolean;
  }>(),
  { height: 300, showLegend: true, showTooltip: true },
);

const size = 300;
const center = size / 2;
const maxRadius = 108;
const keys = computed(() => props.series ?? Object.keys(props.config));

function value(row: Record<string, string | number>, key: string) {
  const next = Number(row[key]);
  return Number.isFinite(next) ? next : 0;
}

const angles = computed(() =>
  props.data.map((_, index) => -Math.PI / 2 + (index * Math.PI * 2) / props.data.length),
);

const series = computed(() => {
  const max = Math.max(
    ...props.data.flatMap((row) => keys.value.map((key) => value(row, key))),
    5,
  );
  return keys.value.map((key, index) => {
    const points = props.data.map((row, rowIndex) => {
      const amount = value(row, key);
      const radius = (amount / max) * maxRadius;
      const angle = angles.value[rowIndex]!;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        value: amount,
        label: row[props.angleKey],
      };
    });
    return {
      key,
      label: props.config[key]?.label ?? key,
      color: seriesColor(props.config, key, index),
      points: points.map((point) => `${point.x},${point.y}`).join(" "),
      dots: points,
    };
  });
});

const legend = computed(() =>
  series.value.map((entry) => ({
    dataKey: entry.key,
    value: entry.label,
    color: entry.color,
  })),
);
</script>

<template>
  <ChartContainer :config="config" :height="height" :class="cn(props.class)">
    <svg :viewBox="`0 0 ${size} ${size}`" class="size-full" role="img" :aria-label="`${keys.join(', ')} radar chart`">
      <title>{{ keys.join(", ") }} radar chart</title>
      <g v-for="ring in 4" :key="ring">
        <polygon
          :points="
            angles
              .map((angle) => {
                const radius = (maxRadius / 4) * ring;
                return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`;
              })
              .join(' ')
          "
          fill="none"
          stroke="var(--border)"
          stroke-dasharray="3 3"
        />
      </g>
      <g>
        <line
          v-for="(angle, index) in angles"
          :key="index"
          :x1="center"
          :y1="center"
          :x2="center + maxRadius * Math.cos(angle)"
          :y2="center + maxRadius * Math.sin(angle)"
          stroke="var(--border)"
        />
      </g>
      <g v-for="entry in series" :key="entry.key">
        <polygon
          :points="entry.points"
          :fill="entry.color"
          fill-opacity="0.18"
          :stroke="entry.color"
          stroke-width="2"
        />
        <circle
          v-for="(point, index) in entry.dots"
          :key="index"
          :cx="point.x"
          :cy="point.y"
          r="3"
          :fill="entry.color"
        >
          <title v-if="showTooltip">{{ point.label }}: {{ point.value }}</title>
        </circle>
      </g>
      <g class="fill-muted-foreground" font-size="11">
        <text
          v-for="(row, index) in data"
          :key="String(row[angleKey])"
          :x="center + (maxRadius + 18) * Math.cos(angles[index] ?? 0)"
          :y="center + (maxRadius + 18) * Math.sin(angles[index] ?? 0)"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {{ row[angleKey] }}
        </text>
      </g>
    </svg>
  </ChartContainer>
  <ChartLegend v-if="showLegend" :payload="legend" />
</template>
