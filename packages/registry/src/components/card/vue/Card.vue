<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'flex flex-col gap-4 rounded-lg border bg-card py-5 text-card-foreground shadow-xs',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
