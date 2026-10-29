<script setup lang="ts">
import { ContextMenuSeparator } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <ContextMenuSeparator
    data-slot="context-menu-separator"
    :class="cn('-mx-1 my-1 h-px bg-border', props.class)"
  />
</template>
