<script setup lang="ts">
import { BottomSheetContent } from "@/components/ui/bottom-sheet";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <BottomSheetContent :class="props.class">
    <slot />
  </BottomSheetContent>
</template>
