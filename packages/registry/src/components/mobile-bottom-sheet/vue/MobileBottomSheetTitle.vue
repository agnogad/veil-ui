<script setup lang="ts">
import { BottomSheetTitle } from "@/components/ui/bottom-sheet";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <BottomSheetTitle :class="props.class">
    <slot />
  </BottomSheetTitle>
</template>
