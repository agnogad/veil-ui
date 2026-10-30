<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { onBeforeUnmount, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import type { ButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { SplitButtonAction } from "./types";

const props = withDefaults(
  defineProps<{
    label: string;
    items: SplitButtonAction[];
    align?: "start" | "end";
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    disabled?: boolean;
    class?: string;
  }>(),
  { align: "end" },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
  select: [label: string];
}>();

const open = ref(false);
const container = ref<HTMLElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const trigger = ref<{ $el?: HTMLElement } | null>(null);

function close(refocus = true) {
  open.value = false;
  if (refocus) trigger.value?.$el?.focus();
}

function onPointerDown(event: PointerEvent) {
  if (!open.value) return;
  if (!container.value?.contains(event.target as Node)) close();
}

function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    close();
    return;
  }
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

  event.preventDefault();
  const entries = Array.from(
    menu.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? [],
  );
  if (entries.length === 0) return;
  const index = entries.indexOf(document.activeElement as HTMLElement);
  const next =
    event.key === "ArrowDown"
      ? entries[(index + 1) % entries.length]
      : entries[(index - 1 + entries.length) % entries.length];
  next?.focus();
}

function select(item: SplitButtonAction) {
  if (item.disabled) return;
  emit("select", item.label);
  close();
}

watch(open, (value) => {
  if (value) {
    document.addEventListener("pointerdown", onPointerDown);
    requestAnimationFrame(() => {
      menu.value
        ?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')
        ?.focus();
    });
  } else {
    document.removeEventListener("pointerdown", onPointerDown);
  }
});

onBeforeUnmount(() => document.removeEventListener("pointerdown", onPointerDown));
</script>

<template>
  <div
    ref="container"
    data-slot="split-button"
    :class="cn('relative inline-flex items-stretch', props.class)"
  >
    <Button
      :variant="variant"
      :size="size"
      :disabled="disabled"
      class="rounded-r-none"
      @click="emit('click', $event)"
    >
      {{ label }}
    </Button>
    <Button
      ref="trigger"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :aria-label="`More ${label} options`"
      aria-haspopup="menu"
      :aria-expanded="open"
      class="rounded-l-none border-l border-primary-foreground/20 px-2"
      @click="open = !open"
    >
      <ChevronDown aria-hidden="true" />
    </Button>
    <div
      v-if="open"
      ref="menu"
      role="menu"
      :aria-label="`${label} options`"
      :class="
        cn(
          'absolute top-full z-50 mt-1 min-w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          align === 'end' ? 'right-0' : 'left-0',
        )
      "
      @keydown="onMenuKeydown"
    >
      <button
        v-for="item in items"
        :key="item.label"
        type="button"
        role="menuitem"
        :disabled="item.disabled"
        class="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        @click="select(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
