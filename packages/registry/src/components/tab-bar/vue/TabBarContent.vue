<script setup lang="ts">
import { TabsContent } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{
  value: string;
  forceMount?: boolean;
  class?: string;
}>();
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    :value="value"
    :force-mount="forceMount"
    :class="
      cn(
        'flex-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=active]:animate-in data-[state=active]:fade-in-0',
        props.class,
      )
    "
  >
    <slot />
  </TabsContent>
</template>
