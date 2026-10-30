<script setup lang="ts">
import { ChartTooltip } from "./index";
</script>

<template>
  <ChartTooltip
    active
    label="Wednesday"
    :payload="[
      { dataKey: 'desktop', name: 'Desktop', value: '1,204', color: 'var(--chart-1)' },
      { dataKey: 'mobile', name: 'Mobile', value: '864', color: 'var(--chart-2)' },
    ]"
  />
</template>
