<script setup lang="ts">
import { DrawerPortal } from "@/components/ui/drawer";
</script>

<template>
  <DrawerPortal>
    <slot />
  </DrawerPortal>
</template>
