<script setup lang="ts">
import { AccordionItem } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; value?: string; disabled?: boolean }>();
</script>

<template>
  <AccordionItem
    data-slot="accordion-item"
    :value="value"
    :disabled="disabled"
    :class="cn('border-b last:border-b-0', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
