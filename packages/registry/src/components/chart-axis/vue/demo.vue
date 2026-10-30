<script setup lang="ts">
import { ChartXAxis, ChartYAxis } from "./index";
</script>

<template>
  <svg viewBox="0 0 560 240" class="w-full max-w-xl" role="img" aria-label="Axis example">
    <title>Axis example</title>
    <ChartYAxis :labels="[80, 60, 40, 20, 0]" :width="560" :height="240" />
    <ChartXAxis :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri']" :width="560" :height="240" />
  </svg>
</template>
