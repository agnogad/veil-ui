<script setup lang="ts">
import { DialogOverlay } from "@/components/ui/modal";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogOverlay :class="props.class" />
</template>
