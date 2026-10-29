<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { buttonVariants, type ButtonVariants } from "./variants";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    asChild?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    class?: string;
  }>(),
  { asChild: false, type: "button" },
);

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <Primitive
    v-if="asChild"
    as-child
    data-slot="button"
    :data-variant="variant ?? 'default'"
    :data-size="size ?? 'default'"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
  <button
    v-else
    data-slot="button"
    :data-variant="variant ?? 'default'"
    :data-size="size ?? 'default'"
    :type="type"
    :disabled="disabled"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
