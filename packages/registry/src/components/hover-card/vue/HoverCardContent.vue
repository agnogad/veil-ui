<script setup lang="ts">
import { HoverCardContent, HoverCardPortal } from "reka-ui";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }>(),
  { align: "center", sideOffset: 4 },
);
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      role="dialog"
      :align="align"
      :side-offset="sideOffset"
      :class="
        cn(
          'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--reka-popper-transform-origin)]',
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
