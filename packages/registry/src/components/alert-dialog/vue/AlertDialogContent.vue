<script setup lang="ts">
import {
  AlertDialogContent,
  AlertDialogPortal,
} from "reka-ui";

import { cn } from "@/lib/utils";

import AlertDialogOverlay from "./AlertDialogOverlay.vue";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      :class="
        cn(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg',
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
