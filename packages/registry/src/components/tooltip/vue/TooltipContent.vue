<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
} from "reka-ui";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{ class?: string; sideOffset?: number }>(),
  { sideOffset: 6 },
);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      :side-offset="sideOffset"
      :class="
        cn(
          'z-50 w-fit max-w-xs rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md',
          'origin-[var(--reka-tooltip-content-transform-origin)]',
          'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[state=instant-open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2',
          '[--veil-animation-duration:100ms] [--veil-exit-duration:80ms]',
          props.class,
        )
      "
    >
      <slot />
      <TooltipArrow
        class="z-50 size-2.5 translate-y-[calc(-50%_-_1px)] rotate-45 rounded-[2px] bg-foreground fill-foreground"
      />
    </TooltipContent>
  </TooltipPortal>
</template>
