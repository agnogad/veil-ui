<script setup lang="ts">
import { AccordionContent } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    class="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
  >
    <div :class="cn('pb-4 text-sm text-muted-foreground', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
