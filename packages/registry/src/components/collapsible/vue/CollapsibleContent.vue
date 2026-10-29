<script setup lang="ts">
import { CollapsibleContent } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    :class="
      cn(
        'overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
        props.class,
      )
    "
  >
    <slot />
  </CollapsibleContent>
</template>
