<script setup lang="ts">
import { BottomSheetTrigger } from "@/components/ui/bottom-sheet";

defineOptions({ inheritAttrs: false });

</script>

<template>
  <BottomSheetTrigger v-bind="$attrs">
    <slot />
  </BottomSheetTrigger>
</template>
