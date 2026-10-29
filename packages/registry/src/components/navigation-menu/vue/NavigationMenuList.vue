<script setup lang="ts">
import { NavigationMenuList } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    :class="cn('group flex flex-1 list-none items-center gap-1', props.class)"
  >
    <slot />
  </NavigationMenuList>
</template>
