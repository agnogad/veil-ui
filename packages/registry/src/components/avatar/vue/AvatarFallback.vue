<script setup lang="ts">
import { AvatarFallback } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    :class="
      cn(
        'flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </AvatarFallback>
</template>
