<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      :class="
        cn(
          'group flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium outline-none transition-colors hover:text-foreground/80 focus-visible:ring-2 focus-visible:ring-ring',
          props.class,
        )
      "
    >
      <slot />
      <ChevronDown
        aria-hidden="true"
        class="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
