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
  <g data-slot="chart-x-axis" class="fill-muted-foreground">
    <text
      v-for="(label, index) in labels"
      :key="String(label)"
      :x="index * (width / Math.max(labels.length, 1)) + width / Math.max(labels.length, 1) / 2"
      :y="height - 4"
      text-anchor="middle"
      font-size="12"
    >
      {{ label }}
    </text>
  </g>
</template>
