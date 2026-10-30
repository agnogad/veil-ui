<script setup lang="ts">
import { ScatterChart } from "./index";

const points = [
  { x: 12, y: 24, z: 120 },
  { x: 18, y: 31, z: 80 },
  { x: 24, y: 28, z: 150 },
  { x: 31, y: 42, z: 90 },
  { x: 38, y: 39, z: 200 },
  { x: 45, y: 52, z: 110 },
  { x: 52, y: 48, z: 170 },
];
</script>

<template>
  <div class="grid gap-4">
    <ScatterChart :data="points" x-label="Hours" y-label="Output" class="max-w-xl" />
    <ScatterChart
      :data="points"
      x-label="Sessions"
      y-label="Conversions"
      color="#22c55e"
      :height="220"
      class="max-w-md"
    />
  </div>
</template>
