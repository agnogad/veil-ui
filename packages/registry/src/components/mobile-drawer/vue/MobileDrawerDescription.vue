<script setup lang="ts">
import { DrawerDescription } from "@/components/ui/drawer";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DrawerDescription :class="props.class">
    <slot />
  </DrawerDescription>
</template>
