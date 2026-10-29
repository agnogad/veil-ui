<script setup lang="ts">
import { BottomNavigation } from "@/components/ui/bottom-navigation";

import type { MobileBottomNavProps } from "./types";

const props = defineProps<MobileBottomNavProps>();
</script>

<template>
  <BottomNavigation
    :items="props.items"
    :variant="props.variant"
    :class="props.class"
    :on-select="props.onSelect"
  />
</template>
