<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
import { Primitive } from "reka-ui";
import { computed, mergeProps } from "vue";

import { cn } from "@/lib/utils";

import { linkButtonVariants, type LinkButtonVariants } from "./variants";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: LinkButtonVariants["variant"];
    underline?: boolean | null;
    asChild?: boolean;
    external?: boolean;
    class?: string;
  }>(),
  {
    variant: "default",
    underline: false,
    asChild: false,
    external: false,
  },
);

const classes = computed(() =>
  cn(linkButtonVariants({ variant: props.variant, underline: props.underline }), props.class),
);

const externalProps = computed(() =>
  props.external ? { target: "_blank", rel: "noreferrer noopener" } : {},
);
</script>

<template>
  <Primitive
    v-if="asChild"
    as-child
    data-slot="link-button"
    :class="classes"
    v-bind="mergeProps(externalProps, $attrs)"
  >
    <slot />
  </Primitive>
  <a
    v-else
    data-slot="link-button"
    :class="classes"
    v-bind="mergeProps(externalProps, $attrs)"
  >
    <slot />
    <template v-if="external">
      <ArrowUpRight aria-hidden="true" class="size-3.5" />
      <span class="sr-only">(opens in a new tab)</span>
    </template>
  </a>
</template>
