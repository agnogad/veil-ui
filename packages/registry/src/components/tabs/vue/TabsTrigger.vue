<script setup lang="ts">
import { TabsTrigger } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; value: string; disabled?: boolean }>();
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'inline-flex h-7 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium outline-none transition-[color,background-color,box-shadow]',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
