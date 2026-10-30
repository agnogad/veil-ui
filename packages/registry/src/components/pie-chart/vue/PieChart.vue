<script setup lang="ts">
import { computed } from "vue";

import {
  ChartContainer,
  ChartLegend,
  chartColors,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface PieDatum {
  name: string;
  value: number;
}

const props = withDefaults(
  defineProps<{
    data: PieDatum[];
    height?: number;
    class?: string;
    colors?: string[];
    showLegend?: boolean;
    showTooltip?: boolean;
    showLabels?: boolean;
    innerRadius?: number | string;
    outerRadius?: number | string;
  }>(),
  {
    height: 300,
    showLegend: true,
    showTooltip: true,
    showLabels: false,
    innerRadius: 0,
    outerRadius: "80%",
  },
);

const size = 300;
const center = size / 2;

function radius(value: number | string, base: number) {
  if (typeof value === "number") return Math.min(value, base);
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? (base * parsed) / 100 : base;
}

function polar(angle: number, r: number) {
  return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
}

function arc(start: number, end: number, inner: number, outer: number) {
  const [x1, y1] = polar(start, outer);
  const [x2, y2] = polar(end, outer);
  const [x3, y3] = polar(end, inner);
  const [x4, y4] = polar(start, inner);
  const large = end - start > Math.PI ? 1 : 0;
  if (inner <= 0) {
    return `M${center},${center} L${x1},${y1} A${outer},${outer} 0 ${large} 1 ${x2},${y2} Z`;
  }
  return `M${x1},${y1} A${outer},${outer} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${inner},${inner} 0 ${large} 0 ${x4},${y4} Z`;
}

const slices = computed(() => {
  const colors = props.colors ?? chartColors;
  const total = props.data.reduce((sum, item) => sum + item.value, 0) || 1;
  const inner = radius(props.innerRadius, center - 8);
  const outer = radius(props.outerRadius, center - 8);
  let angle = -Math.PI / 2;

  return props.data.map((item, index) => {
    const sweep = (item.value / total) * Math.PI * 2;
    const start = angle;
    const end = angle + sweep - 0.02;
    angle += sweep;
    const mid = (start + end) / 2;
    return {
      ...item,
      color: colors[index % colors.length]!,
      path: arc(start, end, inner, outer),
      labelX: center + ((inner + outer) / 2) * Math.cos(mid),
      labelY: center + ((inner + outer) / 2) * Math.sin(mid),
      percent: Math.round((item.value / total) * 100),
    };
  });
});

const config = computed<ChartConfig>(() =>
  Object.fromEntries(
    slices.value.map((slice) => [
      slice.name,
      { label: slice.name, color: slice.color },
    ]),
  ),
);

const legend = computed(() =>
  slices.value.map((slice) => ({
    dataKey: slice.name,
    value: slice.name,
    color: slice.color,
  })),
);
</script>

<template>
  <ChartContainer :config="config" :height="height" :class="cn(props.class)">
    <svg
      :viewBox="`0 0 ${size} ${size}`"
      class="size-full"
      role="img"
      :aria-label="`${data.map((item) => `${item.name}: ${item.value}`).join(', ')}`"
    >
      <title>{{ data.map((item) => `${item.name}: ${item.value}`).join(", ") }}</title>
      <g v-for="slice in slices" :key="slice.name">
        <path :d="slice.path" :fill="slice.color" stroke="var(--background)" stroke-width="2">
          <title v-if="showTooltip">{{ slice.name }}: {{ slice.value }} ({{ slice.percent }}%)</title>
        </path>
        <text
          v-if="showLabels"
          :x="slice.labelX"
          :y="slice.labelY"
          text-anchor="middle"
          dominant-baseline="middle"
          class="fill-background"
          font-size="11"
          font-weight="600"
        >
          {{ slice.percent }}%
        </text>
      </g>
    </svg>
  </ChartContainer>
  <ChartLegend v-if="showLegend" :payload="legend" />
</template>
