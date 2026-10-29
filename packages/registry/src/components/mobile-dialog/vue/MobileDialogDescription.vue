<script setup lang="ts">
import { DialogDescription } from "@/components/ui/modal";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogDescription :class="props.class">
    <slot />
  </DialogDescription>
</template>
