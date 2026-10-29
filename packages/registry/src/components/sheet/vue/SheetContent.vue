<script setup lang="ts">
import { DialogClose, DialogContent, DialogPortal } from "reka-ui";
import { X } from "lucide-vue-next";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import SheetOverlay from "./SheetOverlay.vue";

type SheetSide = "top" | "right" | "bottom" | "left";

const props = withDefaults(
  defineProps<{ class?: string; side?: SheetSide }>(),
  { side: "right" },
);

const sideClasses: Record<SheetSide, string> = {
  top: "inset-x-0 top-0 max-h-[85vh] border-b data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
  bottom:
    "inset-x-0 bottom-0 max-h-[85vh] border-t data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full",
  left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full",
  right:
    "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full",
};

const classes = computed(() =>
  cn(
    "fixed z-50 flex flex-col gap-4 overflow-y-auto border bg-background p-6 shadow-lg outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out [--veil-animation-duration:300ms] [--veil-exit-duration:200ms]",
    sideClasses[props.side],
    props.class,
  ),
);
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent data-slot="sheet-content" :data-side="side" :class="classes">
      <slot />
      <DialogClose
        data-slot="sheet-close"
        aria-label="Close sheet"
        class="absolute top-4 right-4 rounded-sm p-1 text-muted-foreground opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X class="size-4" aria-hidden="true" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
