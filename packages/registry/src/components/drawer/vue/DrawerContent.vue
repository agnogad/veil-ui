<script setup lang="ts">
import { DialogClose, DialogContent, DialogPortal } from "reka-ui";
import { X } from "lucide-vue-next";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import DrawerOverlay from "./DrawerOverlay.vue";

const props = withDefaults(
  defineProps<{ class?: string; side?: "left" | "right" }>(),
  { side: "right" },
);

const classes = computed(() =>
  cn(
    "fixed inset-y-0 z-50 flex h-full w-3/4 flex-col gap-4 border bg-background p-6 shadow-lg outline-none sm:max-w-sm",
    "data-[state=open]:animate-in data-[state=closed]:animate-out [--veil-animation-duration:300ms] [--veil-exit-duration:200ms]",
    props.side === "right"
      ? "right-0 border-l data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full"
      : "left-0 border-r data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full",
    props.class,
  ),
);
</script>

<template>
  <DialogPortal>
    <DrawerOverlay />
    <DialogContent
      data-slot="drawer-content"
      :data-side="side"
      :class="classes"
    >
      <slot />
      <DialogClose
        data-slot="drawer-close"
        aria-label="Close drawer"
        class="absolute top-4 right-4 rounded-sm p-1 text-muted-foreground opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X class="size-4" aria-hidden="true" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
