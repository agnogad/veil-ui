<script setup lang="ts">
import { DialogHeader } from "@/components/ui/modal";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogHeader :class="props.class">
    <slot />
  </DialogHeader>
</template>
