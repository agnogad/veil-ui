<script setup lang="ts">
import { NavigationMenuTrigger } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    :class="
      cn(
        'group inline-flex h-9 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent/50',
        props.class,
      )
    "
  >
    <slot />
    <ChevronDown
      class="size-3.5 transition-transform group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
