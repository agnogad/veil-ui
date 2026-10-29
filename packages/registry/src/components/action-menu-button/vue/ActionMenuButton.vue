<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "reka-ui";
import { MoreHorizontal } from "lucide-vue-next";

import { buttonVariants, type ButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionMenuItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

const props = withDefaults(
  defineProps<{
    items: ActionMenuItem[];
    /** Accessible name of the trigger. */
    label?: string;
    align?: "start" | "center" | "end";
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: string;
  }>(),
  {
    label: "Open actions",
    align: "end",
    variant: "ghost",
    size: "icon",
  },
);

function itemClass(item: ActionMenuItem) {
  return item.destructive
    ? "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-destructive outline-none focus:bg-destructive/10 focus:text-destructive data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    : "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
}
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <button
        type="button"
        data-slot="action-menu-button"
        :data-variant="variant"
        :data-size="size"
        :aria-label="label"
        :class="cn(buttonVariants({ variant, size }), props.class)"
      >
        <MoreHorizontal aria-hidden="true" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        :align="align"
        :side-offset="4"
        :class="
          cn(
            'z-50 min-w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--reka-popper-transform-origin)]',
          )
        "
      >
        <DropdownMenuItem
          v-for="item in props.items"
          :key="item.label"
          :disabled="item.disabled"
          :class="itemClass(item)"
          @select="item.onSelect?.()"
        >
          {{ item.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
