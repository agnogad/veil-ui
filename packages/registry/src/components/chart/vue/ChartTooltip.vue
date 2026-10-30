<script setup lang="ts">
import ChartTooltipContent from "./ChartTooltipContent.vue";

defineProps<{
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    name?: string;
    value?: string | number;
    color?: string;
  }>;
  label?: string | number;
  hideLabel?: boolean;
}>();
</script>

<template>
  <ChartTooltipContent
    :active="active"
    :payload="payload"
    :label="label"
    :hide-label="hideLabel"
  />
</template>
