<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { spinnerVariants, type SpinnerVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    class?: string;
    size?: SpinnerVariants["size"];
    label?: string;
  }>(),
  { label: "Loading" },
);

const iconClasses = computed(() => spinnerVariants({ size: props.size }));
</script>

<template>
  <span
    data-slot="spinner"
    role="status"
    :class="cn('inline-flex items-center justify-center', props.class)"
  >
    <Loader2 aria-hidden="true" :class="iconClasses" />
    <span class="sr-only">{{ label }}</span>
  </span>
</template>
