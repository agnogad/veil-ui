<script setup lang="ts">
import {
  CommandMenu,
  type CommandMenuItem,
} from "@/components/ui/command-menu";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    items: CommandMenuItem[];
    placeholder?: string;
    emptyMessage?: string;
    title?: string;
    class?: string;
  }>(),
  {
    placeholder: "Search commands…",
    emptyMessage: "No results found.",
    title: "Command menu",
  },
);

const open = defineModel<boolean>("open", { default: false });
</script>

<template>
  <CommandMenu
    v-model:open="open"
    :items="props.items"
    :placeholder="props.placeholder"
    :empty-message="props.emptyMessage"
    :title="props.title"
    :class="cn(props.class)"
  >
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
  </CommandMenu>
</template>
