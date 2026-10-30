<script setup lang="ts">
import { BarChart } from "./index";
import type { ChartConfig } from "@/components/ui/chart";

const orders: ChartConfig = {
  fulfilled: { label: "Fulfilled", color: "#22c55e" },
  pending: { label: "Pending", color: "#f59e0b" },
};

const data = [
  { week: "W1", fulfilled: 320, pending: 45 },
  { week: "W2", fulfilled: 410, pending: 62 },
  { week: "W3", fulfilled: 380, pending: 38 },
  { week: "W4", fulfilled: 460, pending: 54 },
];
</script>

<template>
  <div class="grid gap-4">
    <BarChart :data="data" :config="orders" x-key="week" class="max-w-xl" />
    <BarChart
      :data="data"
      :config="orders"
      x-key="week"
      stacked
      :height="220"
      class="max-w-xl"
    />
  </div>
</template>
