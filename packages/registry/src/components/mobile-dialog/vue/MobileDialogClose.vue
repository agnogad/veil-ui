<script setup lang="ts">
import { DialogClose } from "@/components/ui/modal";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <DialogClose v-bind="$attrs">
    <slot />
  </DialogClose>
</template>
