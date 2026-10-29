<script setup lang="ts">
import { ToggleGroupRoot } from "reka-ui";
import { provide, toRef } from "vue";

import { cn } from "@/lib/utils";

import {
  toggleGroupContextKey,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from "./context";

const props = withDefaults(
  defineProps<{
    type?: "single" | "multiple";
    variant?: ToggleGroupVariant;
    size?: ToggleGroupSize;
    defaultValue?: string | string[];
    disabled?: boolean;
    rovingFocus?: boolean;
    orientation?: "horizontal" | "vertical";
    loop?: boolean;
    class?: string;
  }>(),
  { type: "single", disabled: false },
);

const model = defineModel<string | string[]>();

provide(toggleGroupContextKey, {
  variant: toRef(props, "variant"),
  size: toRef(props, "size"),
});
</script>

<template>
  <ToggleGroupRoot
    v-model="model"
    data-slot="toggle-group"
    :data-variant="variant ?? 'default'"
    :data-size="size ?? 'default'"
    :type="type"
    :default-value="defaultValue"
    :disabled="disabled"
    :roving-focus="rovingFocus"
    :orientation="orientation"
    :loop="loop"
    :class="
      cn(
        'inline-flex w-fit items-center rounded-md',
        '[&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:not(:first-child)]:-ml-px',
        props.class,
      )
    "
  >
    <slot />
  </ToggleGroupRoot>
</template>
