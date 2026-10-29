<script setup lang="ts">
import { ContextMenuItem } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    inset?: boolean;
    variant?: "default" | "destructive";
    disabled?: boolean;
    textValue?: string;
  }>(),
  { inset: false, variant: "default" },
);

const classes = computed(() =>
  cn(
    "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    props.inset && "pl-8",
    props.variant === "destructive" &&
      "text-destructive focus:bg-destructive/10 focus:text-destructive",
    props.class,
  ),
);
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    :disabled="disabled"
    :text-value="textValue"
    :class="classes"
  >
    <slot />
  </ContextMenuItem>
</template>
