<script setup lang="ts">
import { DrawerFooter } from "@/components/ui/drawer";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DrawerFooter :class="props.class">
    <slot />
  </DrawerFooter>
</template>
