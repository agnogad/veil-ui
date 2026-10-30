<script setup lang="ts">
withDefaults(
  defineProps<{
    labels: Array<string | number>;
    width?: number;
    height?: number;
    padding?: number;
  }>(),
  { width: 560, height: 240, padding: 24 },
);
</script>

<template>
  <g data-slot="chart-y-axis" class="fill-muted-foreground">
    <text
      v-for="(label, index) in labels"
      :key="String(label)"
      :x="padding - 8"
      :y="((height - padding) / Math.max(labels.length - 1, 1)) * index + 8"
      text-anchor="end"
      font-size="12"
    >
      {{ label }}
    </text>
  </g>
</template>
