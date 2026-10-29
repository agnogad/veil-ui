<script setup lang="ts">
import { NavigationMenuContent } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    :class="
      cn(
        'absolute left-0 top-full z-50 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in-0 data-[motion^=from-]:zoom-in-95 data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out-0 data-[motion^=to-]:zoom-out-95',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuContent>
</template>
