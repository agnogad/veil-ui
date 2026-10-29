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
          'z-50 w-fit max-w-xs origin-[var(--reka-tooltip-content-transform-origin)] rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md',
          'data-[state=closed]:opacity-0',
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
