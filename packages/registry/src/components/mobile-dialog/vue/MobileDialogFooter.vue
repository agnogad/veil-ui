<script setup lang="ts">
import { DialogFooter } from "@/components/ui/modal";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogFooter :class="props.class">
    <slot />
  </DialogFooter>
</template>
