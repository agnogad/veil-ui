<script setup lang="ts">
import { DialogTitle } from "@/components/ui/modal";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogTitle :class="props.class">
    <slot />
  </DialogTitle>
</template>
