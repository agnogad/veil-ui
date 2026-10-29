<script setup lang="ts">
import { SelectIcon, SelectTrigger } from "reka-ui";
import { ChevronDown } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{ class?: string; disabled?: boolean }>(),
  { disabled: false },
);
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :disabled="disabled"
    :class="
      cn(
        'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color]',
        'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        '[&>span]:truncate [&_svg]:pointer-events-none [&_svg]:shrink-0',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
