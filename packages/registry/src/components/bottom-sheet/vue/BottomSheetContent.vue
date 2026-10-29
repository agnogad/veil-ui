<script setup lang="ts">
import { DialogClose, DialogContent, DialogPortal } from "reka-ui";
import { X } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import BottomSheetOverlay from "./BottomSheetOverlay.vue";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogPortal>
    <BottomSheetOverlay />
    <DialogContent
      data-slot="bottom-sheet-content"
      :class="
        cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col gap-4 overflow-y-auto rounded-t-xl border-t bg-background px-6 pb-6 pt-3 shadow-lg outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out [--veil-animation-duration:300ms] [--veil-exit-duration:200ms]',
          'data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full',
          props.class,
        )
      "
    >
      <div
        aria-hidden="true"
        class="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-muted"
      />
      <slot />
      <DialogClose
        data-slot="bottom-sheet-close"
        aria-label="Close bottom sheet"
        class="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X class="size-4" aria-hidden="true" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
