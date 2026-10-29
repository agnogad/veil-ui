<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { alertVariants, type AlertVariants } from "./variants";

const props = defineProps<{
  class?: string;
  variant?: AlertVariants["variant"];
}>();

const classes = computed(() =>
  cn(alertVariants({ variant: props.variant }), props.class),
);
</script>

<template>
  <div
    data-slot="alert"
    :data-variant="variant ?? 'default'"
    role="alert"
    :class="classes"
  >
    <slot />
  </div>
</template>
