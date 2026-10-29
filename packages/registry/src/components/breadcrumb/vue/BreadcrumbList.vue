<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <ol
    data-slot="breadcrumb-list"
    :class="
      cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2',
        props.class,
      )
    "
  >
    <slot />
  </ol>
</template>
