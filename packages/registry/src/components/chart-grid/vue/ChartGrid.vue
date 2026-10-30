<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    ticks?: number;
    vertical?: boolean;
  }>(),
  { width: 560, height: 220, ticks: 4, vertical: false },
);
</script>

<template>
  <g data-slot="chart-grid">
    <line
      v-for="tick in ticks"
      :key="`h-${tick}`"
      x1="0"
      :y1="((height - 24) / ticks) * (tick - 1) + 12"
      :x2="width"
      :y2="((height - 24) / ticks) * (tick - 1) + 12"
      stroke="var(--border)"
      stroke-dasharray="3 3"
    />
    <line
      v-for="tick in vertical ? ticks : 0"
      :key="`v-${tick}`"
      :x1="(width / ticks) * (tick - 1)"
      y1="0"
      :x2="(width / ticks) * (tick - 1)"
      :y2="height - 24"
      stroke="var(--border)"
      stroke-dasharray="3 3"
    />
  </g>
</template>
