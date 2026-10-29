<script setup lang="ts">
import { PopoverContent, PopoverPortal } from "reka-ui";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }>(),
  { align: "center", sideOffset: 4 },
);
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      :align="align"
      :side-offset="sideOffset"
      :class="
        cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
