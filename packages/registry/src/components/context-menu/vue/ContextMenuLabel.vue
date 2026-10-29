<script setup lang="ts">
import { ContextMenuLabel } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    :class="cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', props.class)"
  >
    <slot />
  </ContextMenuLabel>
</template>
