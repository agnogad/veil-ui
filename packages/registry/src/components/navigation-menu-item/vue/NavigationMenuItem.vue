<script setup lang="ts">
import { NavigationMenuItem as BaseNavigationMenuItem } from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; value?: string }>();
</script>

<template>
  <BaseNavigationMenuItem :value="value" :class="cn(props.class)">
    <slot />
  </BaseNavigationMenuItem>
</template>
