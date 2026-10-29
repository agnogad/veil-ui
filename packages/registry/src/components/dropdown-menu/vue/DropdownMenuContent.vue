<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";

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
  <DropdownMenuPortal>
    <DropdownMenuContent
      data-slot="dropdown-menu-content"
      :align="align"
      :side-offset="sideOffset"
      :class="
        cn(
          'z-50 min-w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          props.class,
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
