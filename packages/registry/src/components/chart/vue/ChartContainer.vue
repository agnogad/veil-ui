<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { provideChartConfig } from "./use-chart";
import type { ChartConfig } from "./variants";

const props = withDefaults(
  defineProps<{
    config: ChartConfig;
    height?: number;
    class?: string;
  }>(),
  { height: 300 },
);

provideChartConfig(props.config);

const style = computed(() => ({ height: `${props.height}px` }));
</script>

<template>
  <div data-slot="chart" :class="cn('w-full', props.class)" :style="style">
    <slot />
  </div>
</template>
