<script setup lang="ts">
import { NavigationMenuItem } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; value?: string }>();
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    :value="value"
    :class="cn('relative', props.class)"
  >
    <slot />
  </NavigationMenuItem>
</template>
