<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{ class?: string; align?: "inline-start" | "inline-end" }>(),
  { align: "inline-start" },
);
</script>

<template>
  <div
    data-slot="input-group-addon"
    :data-align="align"
    :class="
      cn(
        'flex h-full shrink-0 items-center gap-2 text-sm text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0',
        align === 'inline-start' ? 'pl-3' : 'pr-3',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
