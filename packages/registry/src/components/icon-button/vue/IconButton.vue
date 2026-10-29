<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { iconButtonVariants, type IconButtonVariants } from "./variants";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: IconButtonVariants["variant"];
    size?: IconButtonVariants["size"];
    asChild?: boolean;
    class?: string;
  }>(),
  { variant: "default", size: "default", asChild: false },
);

const classes = computed(() =>
  cn(iconButtonVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <Primitive
    v-if="asChild"
    as-child
    data-slot="icon-button"
    :data-variant="variant"
    :data-size="size"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
  <button
    v-else
    data-slot="icon-button"
    :data-variant="variant"
    :data-size="size"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
