<script setup lang="ts">
import { LineChart } from "./index";
import type { ChartConfig } from "@/components/ui/chart";

const traffic: ChartConfig = {
  visitors: { label: "Visitors", color: "#6366f1" },
  signups: { label: "Sign-ups", color: "#22c55e" },
};

const data = [
  { day: "Mon", visitors: 820, signups: 96 },
  { day: "Tue", visitors: 940, signups: 118 },
  { day: "Wed", visitors: 1010, signups: 132 },
  { day: "Thu", visitors: 980, signups: 121 },
  { day: "Fri", visitors: 1180, signups: 158 },
  { day: "Sat", visitors: 760, signups: 82 },
  { day: "Sun", visitors: 690, signups: 74 },
];
</script>

<template>
  <div class="grid gap-4">
    <LineChart :data="data" :config="traffic" x-key="day" class="max-w-xl" />
    <LineChart
      :data="data"
      :config="traffic"
      x-key="day"
      :series="['signups']"
      :height="220"
      class="max-w-md"
    />
  </div>
</template>
