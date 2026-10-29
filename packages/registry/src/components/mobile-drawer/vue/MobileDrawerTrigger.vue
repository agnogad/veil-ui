<script setup lang="ts">
import { DrawerTrigger } from "@/components/ui/drawer";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <DrawerTrigger v-bind="$attrs">
    <slot />
  </DrawerTrigger>
</template>
