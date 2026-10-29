<script setup lang="ts">
import { DrawerClose } from "@/components/ui/drawer";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <DrawerClose v-bind="$attrs">
    <slot />
  </DrawerClose>
</template>
