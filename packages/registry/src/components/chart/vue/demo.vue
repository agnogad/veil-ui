<script setup lang="ts">
import { ChartContainer, ChartLegend, seriesColor } from "./index";
import type { ChartConfig } from "./variants";

const config: ChartConfig = {
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },
};

const data = [
  { label: "Mon", desktop: 42, mobile: 28 },
  { label: "Tue", desktop: 58, mobile: 36 },
  { label: "Wed", desktop: 51, mobile: 44 },
  { label: "Thu", desktop: 72, mobile: 52 },
  { label: "Fri", desktop: 64, mobile: 48 },
];

const width = 560;
const height = 240;
const max = 80;
const chartHeight = 200;
const step = width / data.length;

function barPath(key: "desktop" | "mobile", index: number, offset: number) {
  const value = data[index]![key];
  const barHeight = (value / max) * chartHeight;
  return {
    x: index * step + 18 + offset,
    y: 12 + chartHeight - barHeight,
    width: step / 3,
    height: barHeight,
    fill: seriesColor(config, key, key === "desktop" ? 0 : 1),
  };
}
</script>

<template>
  <div class="grid w-full max-w-xl gap-3">
    <ChartContainer :config="config" :height="height">
      <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="size-full"
        role="img"
        aria-label="Weekly desktop and mobile sessions"
      >
        <title>Weekly desktop and mobile sessions</title>
        <line
          v-for="tick in 4"
          :key="tick"
          x1="0"
          :y1="12 + (chartHeight / 4) * (tick - 1)"
          :x2="width"
          :y2="12 + (chartHeight / 4) * (tick - 1)"
          stroke="var(--border)"
          stroke-dasharray="3 3"
        />
        <g v-for="(row, index) in data" :key="row.label">
          <rect
            v-bind="barPath('desktop', index, 0)"
            rx="4"
          />
          <rect
            v-bind="barPath('mobile', index, step / 3)"
            rx="4"
          />
          <text
            :x="index * step + step / 2"
            :y="height - 6"
            text-anchor="middle"
            class="fill-muted-foreground text-[11px]"
          >
            {{ row.label }}
          </text>
        </g>
      </svg>
    </ChartContainer>
    <ChartLegend
      :payload="[
        { dataKey: 'desktop', value: 'Desktop' },
        { dataKey: 'mobile', value: 'Mobile' },
      ]"
    />
  </div>
</template>
