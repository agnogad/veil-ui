<script setup lang="ts">
import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Skip native constraint validation and handle it yourself. */
    noValidate?: boolean;
    class?: string;
  }>(),
  { noValidate: true },
);
</script>

<template>
  <form
    data-slot="form"
    :novalidate="noValidate"
    :class="cn('grid gap-6', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </form>
</template>
