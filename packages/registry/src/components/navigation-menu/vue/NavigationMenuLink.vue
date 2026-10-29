<script setup lang="ts">
import { NavigationMenuLink } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; href?: string }>();
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    :href="href"
    :class="
      cn(
        'block select-none rounded-sm p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuLink>
</template>
