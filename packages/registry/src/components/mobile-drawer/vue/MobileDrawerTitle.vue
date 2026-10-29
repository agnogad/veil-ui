<script setup lang="ts">
import { DrawerTitle } from "@/components/ui/drawer";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DrawerTitle :class="props.class">
    <slot />
  </DrawerTitle>
</template>
