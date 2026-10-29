<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    value: number;
    max?: number;
    label?: string;
    height?: number;
    class?: string;
    color?: string;
  }>(),
  { max: 100, label: "Gauge", height: 140, color: "var(--primary)" },
);

const ratio = computed(() =>
  props.max <= 0 ? 0 : Math.min(1, Math.max(0, props.value / props.max)),
);
const display = computed(() => Math.round(ratio.value * 100));
</script>

<template>
  <figure
    data-slot="gauge-chart"
    :class="cn('flex w-full max-w-xs flex-col items-center', props.class)"
  >
    <svg
      role="img"
      :aria-label="`${label}: ${value} of ${max} (${display}%)`"
      viewBox="0 0 200 120"
      :style="{ height: `${height}px` }"
      class="w-full"
    >
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        pathLength="100"
        fill="none"
        stroke="var(--muted)"
        :stroke-width="14"
        stroke-linecap="round"
      />
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        pathLength="100"
        fill="none"
        :stroke="color"
        :stroke-width="14"
        stroke-linecap="round"
        :stroke-dasharray="`${display} 100`"
        class="transition-all duration-500"
      />
      <text
        x="100"
        y="82"
        text-anchor="middle"
        class="fill-foreground text-2xl font-semibold"
        style="fill: currentColor"
      >
        {{ display }}%
      </text>
      <text
        x="100"
        y="104"
        text-anchor="middle"
        class="fill-muted-foreground text-[11px]"
        style="fill: currentColor"
      >
        {{ label }}
      </text>
    </svg>
    <figcaption class="text-xs text-muted-foreground">
      {{ value }} of {{ max }}
    </figcaption>
  </figure>
</template>
