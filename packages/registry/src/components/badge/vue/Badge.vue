<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { badgeVariants, type BadgeVariants } from "./variants";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariants["variant"];
    asChild?: boolean;
    class?: string;
  }>(),
  { asChild: false },
);

const classes = computed(() =>
  cn(badgeVariants({ variant: props.variant }), props.class),
);
</script>

<template>
  <Primitive
    :as="asChild ? undefined : 'span'"
    :as-child="asChild"
    data-slot="badge"
    :data-variant="variant ?? 'default'"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
