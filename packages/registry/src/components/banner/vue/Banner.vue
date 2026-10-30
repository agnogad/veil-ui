<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { bannerVariants, type BannerVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    variant?: BannerVariants["variant"];
    role?: string;
    class?: string;
  }>(),
  { role: "status" },
);

const classes = computed(() =>
  cn(bannerVariants({ variant: props.variant }), props.class),
);
</script>

<template>
  <div
    data-slot="banner"
    :data-variant="variant ?? 'default'"
    :role="role"
    :class="classes"
  >
    <slot />
  </div>
</template>
