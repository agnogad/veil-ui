<script setup lang="ts">
import { DialogClose, DialogContent, DialogPortal } from "reka-ui";
import { X } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import DialogOverlay from "./DialogOverlay.vue";

const props = withDefaults(
  defineProps<{ class?: string; showCloseButton?: boolean }>(),
  { showCloseButton: true },
);
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="modal-content"
      :class="
        cn(
          'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          props.class,
        )
      "
    >
      <slot />
      <DialogClose
        v-if="showCloseButton"
        data-slot="modal-close"
        aria-label="Close dialog"
        class="absolute top-3 right-3 rounded-sm p-1 text-muted-foreground opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X class="size-4" aria-hidden="true" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
