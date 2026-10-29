<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { MobileBottomBarProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<MobileBottomBarProps>(), {
  sticky: true,
});
</script>

<template>
  <div
    data-slot="mobile-bottom-bar"
    v-bind="$attrs"
    :class="
      cn(
        'z-30 flex items-center gap-2 border-t bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur',
        sticky && 'sticky bottom-0',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
