<script setup lang="ts">
import {
  SelectContent,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectViewport,
} from "reka-ui";
import { ChevronDown, ChevronUp } from "lucide-vue-next";

import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    position?: "item-aligned" | "popper";
  }>(),
  { position: "popper" },
);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="$attrs"
      data-slot="select-content"
      :position="position"
      align="center"
      :side-offset="4"
      :class="
        cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--reka-select-content-transform-origin)]',
          position === 'popper' &&
            'w-[var(--reka-select-trigger-width)] min-w-[var(--reka-select-trigger-width)]',
          props.class,
        )
      "
    >
      <SelectScrollUpButton
        data-slot="select-scroll-up"
        class="flex h-6 items-center justify-center"
      >
        <ChevronUp class="size-4" />
      </SelectScrollUpButton>
      <SelectViewport class="p-1">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton
        data-slot="select-scroll-down"
        class="flex h-6 items-center justify-center"
      >
        <ChevronDown class="size-4" />
      </SelectScrollDownButton>
    </SelectContent>
  </SelectPortal>
</template>
