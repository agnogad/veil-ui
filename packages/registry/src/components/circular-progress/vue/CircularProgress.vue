<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import type { CircularProgressProps } from "./types";

const props = withDefaults(defineProps<CircularProgressProps>(), {
  size: 48,
  strokeWidth: 4,
  showValue: false,
  label: "Progress",
});

const clamped = computed(() => Math.min(100, Math.max(0, props.value)));
const radius = computed(() => (props.size - props.strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const offset = computed(
  () => circumference.value - (clamped.value / 100) * circumference.value,
);
</script>

<template>
  <div
    data-slot="circular-progress"
    role="progressbar"
    :aria-label="label"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="Math.round(clamped)"
    :class="cn('relative inline-flex items-center justify-center', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg :width="size" :height="size" class="-rotate-90" aria-hidden="true">
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        class="stroke-muted"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="stroke-primary transition-[stroke-dashoffset]"
      />
    </svg>
    <span v-if="showValue" class="absolute text-xs font-medium">
      {{ Math.round(clamped) }}%
    </span>
  </div>
</template>
