<script setup lang="ts">
import { PieChart } from "@/components/ui/pie-chart";

const props = withDefaults(
  defineProps<{
    data: Array<{ name: string; value: number }>;
    height?: number;
    class?: string;
    colors?: string[];
    showLegend?: boolean;
    showTooltip?: boolean;
    innerRadius?: number | string;
    outerRadius?: number | string;
  }>(),
  { innerRadius: "60%" },
);
</script>

<template>
  <PieChart v-bind="props" :inner-radius="props.innerRadius" />
</template>
