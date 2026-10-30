<script setup lang="ts">
import { ChartLegend } from "./index";
</script>

<template>
  <ChartLegend
    :items="[
      { label: 'Desktop', color: 'var(--chart-1)' },
      { label: 'Mobile', color: 'var(--chart-2)' },
      { label: 'Tablet', color: 'var(--chart-3)' },
    ]"
  />
</template>
