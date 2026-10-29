<script setup lang="ts">
import { NavigationMenuRoot } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <NavigationMenuRoot
    data-slot="navigation-menu"
    :class="cn('relative flex max-w-max flex-1 items-center justify-center', props.class)"
  >
    <slot />
  </NavigationMenuRoot>
</template>
