<script setup lang="ts">
import { BottomNavigation } from "@/components/ui/bottom-navigation";

import type { BottomNavbarProps } from "./types";

const props = defineProps<BottomNavbarProps>();
</script>

<template>
  <BottomNavigation
    :items="props.items"
    :variant="props.variant"
    :class="props.class"
    :on-select="props.onSelect"
  />
</template>
