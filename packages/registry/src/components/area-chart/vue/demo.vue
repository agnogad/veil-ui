<script setup lang="ts">
import { AreaChart } from "./index";
import type { ChartConfig } from "@/components/ui/chart";

const sessions: ChartConfig = {
  desktop: { label: "Desktop", color: "#6366f1" },
  mobile: { label: "Mobile", color: "#06b6d4" },
};

const data = [
  { hour: "00", desktop: 120, mobile: 80 },
  { hour: "06", desktop: 240, mobile: 310 },
  { hour: "12", desktop: 520, mobile: 610 },
  { hour: "18", desktop: 610, mobile: 720 },
  { hour: "24", desktop: 280, mobile: 390 },
];
</script>

<template>
  <div class="grid gap-4">
    <AreaChart :data="data" :config="sessions" x-key="hour" class="max-w-xl" />
    <AreaChart
      :data="data"
      :config="sessions"
      x-key="hour"
      stacked
      :height="220"
      class="max-w-xl"
    />
  </div>
</template>
