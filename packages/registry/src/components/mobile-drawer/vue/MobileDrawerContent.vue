<script setup lang="ts">
import { DrawerContent } from "@/components/ui/drawer";

const props = withDefaults(
  defineProps<{ class?: string; side?: "left" | "right" }>(),
  { side: "right" },
);
</script>

<template>
  <DrawerContent :class="props.class" :side="props.side">
    <slot />
  </DrawerContent>
</template>
