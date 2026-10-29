<script setup lang="ts">
import { CollapsibleTrigger } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <CollapsibleTrigger
    data-slot="collapsible-trigger"
    :class="
      cn(
        'outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class,
      )
    "
  >
    <slot />
  </CollapsibleTrigger>
</template>
