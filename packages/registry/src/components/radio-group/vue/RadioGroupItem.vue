<script setup lang="ts">
import {
  RadioGroupIndicator,
  RadioGroupItem,
} from "reka-ui";
import { Circle } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    value: string;
    disabled?: boolean;
  }>(),
  { disabled: false },
);
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow,border-color]',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="flex items-center justify-center"
    >
      <Circle class="size-2 fill-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
