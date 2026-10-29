<script setup lang="ts">
import { DrawerOverlay } from "@/components/ui/drawer";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DrawerOverlay :class="props.class" />
</template>
