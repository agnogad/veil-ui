<script setup lang="ts">
import { TabsContent } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; value: string }>();
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    :value="value"
    :class="
      cn(
        'flex-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        props.class,
      )
    "
  >
    <slot />
  </TabsContent>
</template>
