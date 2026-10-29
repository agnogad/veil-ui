<script setup lang="ts">
import { ToggleGroupItem } from "reka-ui";
import { computed, inject } from "vue";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

import {
  toggleGroupContextKey,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from "./context";

const props = withDefaults(
  defineProps<{
    class?: string;
    value: string;
    variant?: ToggleGroupVariant;
    size?: ToggleGroupSize;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const context = inject(toggleGroupContextKey, null);

const classes = computed(() =>
  cn(
    toggleVariants({
      variant: context?.variant.value ?? props.variant,
      size: context?.size.value ?? props.size,
    }),
    props.class,
  ),
);
</script>

<template>
  <ToggleGroupItem
    data-slot="toggle-group-item"
    :value="value"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </ToggleGroupItem>
</template>
