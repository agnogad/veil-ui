<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const paddings = {
  none: "p-0",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
} as const;

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    asChild?: boolean;
    padding?: keyof typeof paddings;
    class?: string;
  }>(),
  { asChild: false, padding: "none" },
);

const classes = computed(() => cn(paddings[props.padding], props.class));
</script>

<template>
  <Primitive
    :as="asChild ? undefined : 'div'"
    :as-child="asChild"
    data-slot="box"
    :data-padding="padding"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
