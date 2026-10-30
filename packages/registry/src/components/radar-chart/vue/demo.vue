<script setup lang="ts">
import { RadarChart } from "./index";
import type { ChartConfig } from "@/components/ui/chart";

const skills: ChartConfig = {
  planning: { label: "Planning", color: "#6366f1" },
  execution: { label: "Execution", color: "#22c55e" },
};

const data = [
  { area: "Discovery", planning: 4, execution: 3 },
  { area: "Design", planning: 3, execution: 5 },
  { area: "Build", planning: 4, execution: 4 },
  { area: "Launch", planning: 5, execution: 3 },
  { area: "Support", planning: 3, execution: 4 },
];
</script>

<template>
  <div class="grid gap-4">
    <RadarChart :data="data" :config="skills" angle-key="area" class="max-w-md" />
    <RadarChart
      :data="data"
      :config="skills"
      angle-key="area"
      :series="['execution']"
      :height="240"
      class="max-w-sm"
    />
  </div>
</template>
