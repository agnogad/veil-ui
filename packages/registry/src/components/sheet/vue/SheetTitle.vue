<script setup lang="ts">
import { DialogTitle } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <DialogTitle
    data-slot="sheet-title"
    :class="cn('text-lg font-semibold', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
