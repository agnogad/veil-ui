<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import { Search } from "lucide-vue-next";
import { computed, nextTick, ref, useId, watch } from "vue";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { CommandMenuItem } from "./types";

const props = withDefaults(
  defineProps<{
    items: CommandMenuItem[];
    placeholder?: string;
    emptyMessage?: string;
    title?: string;
    onOpenChange?: (open: boolean) => void;
    class?: string;
  }>(),
  {
    placeholder: "Search commands…",
    emptyMessage: "No results found.",
    title: "Command menu",
  },
);

const open = defineModel<boolean>("open", { default: false });

const query = ref("");
const activeIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const listId = `command-menu-${useId()}`;

const groups = computed(() => {
  const search = query.value.trim().toLowerCase();
  const buckets = new Map<
    string,
    { item: CommandMenuItem; index: number }[]
  >();
  let index = 0;

  for (const item of props.items) {
    const haystack = `${item.label} ${item.value ?? ""}`.toLowerCase();
    if (search && !haystack.includes(search)) continue;

    const group = item.group ?? "Actions";
    const entries = buckets.get(group) ?? [];
    entries.push({ item, index });
    buckets.set(group, entries);
    index += 1;
  }

  return Array.from(buckets, ([title, entries]) => ({ title, entries }));
});

const visibleItems = computed(() =>
  groups.value.flatMap((group) => group.entries.map((entry) => entry.item)),
);

watch(visibleItems, () => {
  activeIndex.value = 0;
});

watch(open, async (isOpen) => {
  props.onOpenChange?.(isOpen);
  if (!isOpen) return;

  query.value = "";
  activeIndex.value = 0;
  await nextTick();
  inputRef.value?.focus();
});

function setActive(index: number) {
  const count = visibleItems.value.length;
  if (!count) return;

  activeIndex.value = (index + count) % count;
  const option = document.getElementById(
    `${listId}-option-${activeIndex.value}`,
  );
  option?.scrollIntoView({ block: "nearest" });
}

function selectItem(item: CommandMenuItem) {
  item.onSelect?.();
  open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (!visibleItems.value.length) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    setActive(activeIndex.value + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setActive(activeIndex.value - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    setActive(0);
  } else if (event.key === "End") {
    event.preventDefault();
    setActive(visibleItems.value.length - 1);
  } else if (event.key === "Enter") {
    event.preventDefault();
    const item = visibleItems.value[activeIndex.value];
    if (item) selectItem(item);
  }
}

function onOpenAutoFocus(event: Event) {
  event.preventDefault();
  inputRef.value?.focus();
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger as-child>
      <slot name="trigger">
        <Button variant="outline">Open command menu</Button>
      </slot>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <DialogContent
        :class="
          cn(
            'fixed left-1/2 top-24 z-50 w-[min(32rem,90vw)] -translate-x-1/2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl focus:outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            props.class,
          )
        "
        @open-auto-focus="onOpenAutoFocus"
      >
        <DialogTitle class="sr-only">{{ title }}</DialogTitle>
        <DialogDescription class="sr-only">
          Search and run a command.
        </DialogDescription>
        <div>
          <div class="flex items-center gap-2 border-b px-3">
            <Search class="size-4 text-muted-foreground" aria-hidden="true" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              :aria-controls="listId"
              :aria-activedescendant="
                visibleItems.length
                  ? `${listId}-option-${activeIndex}`
                  : undefined
              "
              :placeholder="placeholder"
              :aria-label="placeholder"
              class="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              @keydown="onKeydown"
            />
          </div>
          <div
            :id="listId"
            role="listbox"
            :aria-label="title"
            class="max-h-72 overflow-y-auto p-2"
          >
            <div
              v-if="!visibleItems.length"
              class="py-6 text-center text-sm text-muted-foreground"
            >
              {{ emptyMessage }}
            </div>
            <div
              v-for="group in groups"
              :key="group.title"
              role="group"
              :aria-label="group.title"
            >
              <div
                aria-hidden="true"
                class="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {{ group.title }}
              </div>
              <div
                v-for="entry in group.entries"
                :id="`${listId}-option-${entry.index}`"
                :key="entry.item.label"
                role="option"
                :aria-selected="entry.index === activeIndex"
                :class="
                  cn(
                    'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none',
                    entry.index === activeIndex &&
                      'bg-accent text-accent-foreground',
                  )
                "
                @mousemove="activeIndex = entry.index"
                @click="selectItem(entry.item)"
              >
                <span
                  v-if="entry.item.icon"
                  class="text-muted-foreground [&_svg]:size-4"
                >
                  <component :is="entry.item.icon" />
                </span>
                <span>{{ entry.item.label }}</span>
                <span
                  v-if="entry.item.shortcut"
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  {{ entry.item.shortcut }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
