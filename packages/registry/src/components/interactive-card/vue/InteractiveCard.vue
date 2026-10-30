<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  disabled?: boolean;
  class?: string;
}>();

const emit = defineEmits<{ click: [event: MouseEvent] }>();

function onClick(event: MouseEvent) {
  if (!props.disabled) emit("click", event);
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    (event.currentTarget as HTMLElement).click();
  }
}
</script>

<template>
  <Card
    data-slot="interactive-card"
    :data-disabled="disabled || undefined"
    :role="disabled ? undefined : 'button'"
    :tabindex="disabled ? undefined : 0"
    :aria-disabled="disabled || undefined"
    :class="
      cn(
        'cursor-pointer transition-colors hover:border-ring/60 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        disabled && 'cursor-not-allowed opacity-60 hover:border-border hover:bg-card',
        props.class,
      )
    "
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot />
  </Card>
</template>
