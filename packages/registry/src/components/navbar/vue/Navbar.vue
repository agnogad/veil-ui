<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { NavbarProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<NavbarProps>(), {
  sticky: false,
  bordered: true,
});
</script>

<template>
  <header
    data-slot="navbar"
    v-bind="$attrs"
    :class="
      cn(
        'mx-auto flex h-14 w-full max-w-7xl items-center gap-4 bg-background/95 px-4 backdrop-blur sm:px-6',
        bordered && 'border-b',
        sticky && 'sticky top-0 z-40',
        props.class,
      )
    "
  >
    <slot />
  </header>
</template>
