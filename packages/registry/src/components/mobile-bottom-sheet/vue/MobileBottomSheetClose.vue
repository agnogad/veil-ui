<script setup lang="ts">
import { BottomSheetClose } from "@/components/ui/bottom-sheet";

defineOptions({ inheritAttrs: false });

</script>

<template>
  <BottomSheetClose v-bind="$attrs">
    <slot />
  </BottomSheetClose>
</template>
