<script setup lang="ts">
import { Primitive } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    href?: string;
    asChild?: boolean;
    class?: string;
  }>(),
  { asChild: false },
);

const classes = computed(() =>
  cn(
    "rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
    props.class,
  ),
);
</script>

<template>
  <Primitive
    v-if="props.asChild"
    as-child
    data-slot="breadcrumb-link"
    :href="props.href"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
  <a
    v-else
    data-slot="breadcrumb-link"
    :href="props.href"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>
