<script setup lang="ts">
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    modelValue?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    minStepsBetweenThumbs?: number;
    "aria-label"?: string;
  }>(),
  {
    defaultValue: () => [0],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: "horizontal",
    minStepsBetweenThumbs: 0,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number[]];
  "valueCommit": [value: number[]];
}>();

const thumbs = computed(
  () => props.modelValue ?? props.defaultValue ?? [0],
);
</script>

<template>
  <SliderRoot
    data-slot="slider"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :orientation="orientation"
    :min-steps-between-thumbs="minStepsBetweenThumbs"
    :class="
      cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
        props.class,
      )
    "
    @update:model-value="emit('update:modelValue', $event ?? [])"
    @value-commit="emit('valueCommit', $event)"
  >
    <SliderTrack
      data-slot="slider-track"
      class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/15"
    >
      <SliderRange
        data-slot="slider-range"
        class="absolute h-full bg-primary"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(_, index) in thumbs"
      :key="index"
      data-slot="slider-thumb"
      :aria-label="props['aria-label']"
      class="block size-4 rounded-full border border-primary bg-background shadow-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
