<script setup lang="ts">
import { DrawerHeader } from "@/components/ui/drawer";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DrawerHeader :class="props.class">
    <slot />
  </DrawerHeader>
</template>
