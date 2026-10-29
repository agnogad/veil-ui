<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    class?: string;
  }>(),
  { defaultOpen: false, disabled: false },
);

const emit = defineEmits<{ "update:open": [open: boolean] }>();

function handleOpenChange(value: boolean) {
  props.onOpenChange?.(value);
  emit("update:open", value);
}
</script>

<template>
  <Collapsible
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    data-slot="expandable-section"
    :class="
      cn(
        'w-full overflow-hidden rounded-lg border bg-card text-card-foreground',
        props.class,
      )
    "
    @update:open="handleOpenChange"
  >
    <CollapsibleTrigger
      :disabled="disabled"
      class="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span class="flex flex-col gap-0.5">
        <span class="text-sm font-medium">
          <slot name="title">{{ title }}</slot>
        </span>
        <span v-if="description || $slots.description" class="text-sm text-muted-foreground">
          <slot name="description">{{ description }}</slot>
        </span>
      </span>
      <ChevronDown
        class="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="border-t px-4 py-4 text-sm">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
