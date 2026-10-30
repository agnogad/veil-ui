<script setup lang="ts">
import { ChartGrid } from "./index";
</script>

<template>
  <svg viewBox="0 0 560 220" class="w-full max-w-xl" role="img" aria-label="Chart grid">
    <title>Chart grid</title>
    <ChartGrid :width="560" :height="220" :ticks="4" vertical />
  </svg>
</template>
