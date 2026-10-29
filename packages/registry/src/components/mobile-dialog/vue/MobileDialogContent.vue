<script setup lang="ts">
import { DialogContent } from "@/components/ui/modal";

const props = withDefaults(
  defineProps<{ class?: string; showCloseButton?: boolean }>(),
  { showCloseButton: true },
);
</script>

<template>
  <DialogContent
    :class="props.class"
    :show-close-button="props.showCloseButton"
  >
    <slot />
  </DialogContent>
</template>
