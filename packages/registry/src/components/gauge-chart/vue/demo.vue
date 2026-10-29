<script setup lang="ts">
import { GaugeChart } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-start gap-8">
    <GaugeChart :value="68" label="CPU load" />
    <GaugeChart :value="92" :max="100" label="Storage" color="#22c55e" />
  </div>
</template>
