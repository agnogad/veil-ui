<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";

import { cn } from "@/lib/utils";

import type { AutocompleteOption } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    options: AutocompleteOption[];
    defaultValue?: string;
    placeholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
  }>(),
  {
    defaultValue: undefined,
    placeholder: "Type to search…",
    emptyMessage: "No matches found.",
    disabled: false,
  },
);

const model = defineModel<string>();

const listId = useId();
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLUListElement | null>(null);
const query = ref(labelFor(model.value ?? props.defaultValue));
const open = ref(false);
const activeIndex = ref(-1);
const filterQuery = ref(query.value);
let filterTimer: ReturnType<typeof setTimeout> | undefined;

const filtered = computed(() => {
  const needle = filterQuery.value.trim().toLowerCase();
  if (!needle) return props.options;
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(needle),
  );
});

function labelFor(value?: string) {
  return props.options.find((option) => option.value === value)?.label ?? "";
}

function scheduleFilter(value: string) {
  if (filterTimer) clearTimeout(filterTimer);
  filterTimer = setTimeout(() => {
    filterQuery.value = value;
    activeIndex.value = -1;
  }, 60);
}

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  query.value = value;
  open.value = true;
  activeIndex.value = -1;
  scheduleFilter(value);
  if (value === "") model.value = "";
}

function select(option: AutocompleteOption) {
  query.value = option.label;
  filterQuery.value = option.label;
  open.value = false;
  activeIndex.value = -1;
  model.value = option.value;
}

function moveActive(step: number) {
  if (!open.value) open.value = true;
  const last = filtered.value.length - 1;
  if (last < 0) {
    activeIndex.value = -1;
    return;
  }
  activeIndex.value = Math.min(Math.max(activeIndex.value + step, 0), last);
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveActive(1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    moveActive(-1);
  } else if (event.key === "Enter" && open.value && activeIndex.value >= 0) {
    const option = filtered.value[activeIndex.value];
    if (option) {
      event.preventDefault();
      select(option);
    }
  } else if (event.key === "Escape") {
    open.value = false;
    activeIndex.value = -1;
  } else if (event.key === "Home" && open.value) {
    event.preventDefault();
    activeIndex.value = 0;
  } else if (event.key === "End" && open.value) {
    event.preventDefault();
    activeIndex.value = Math.max(filtered.value.length - 1, 0);
  }
}

watch(activeIndex, async () => {
  await nextTick();
  listRef.value
    ?.querySelector<HTMLElement>('[data-active="true"]')
    ?.scrollIntoView({ block: "nearest" });
});

watch(model, (value) => {
  if (!open.value) query.value = labelFor(value);
});

onBeforeUnmount(() => {
  if (filterTimer) clearTimeout(filterTimer);
});
</script>

<template>
  <div data-slot="autocomplete" class="relative w-full">
    <input
      :id="id"
      ref="inputRef"
      v-bind="$attrs"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="open"
      :aria-controls="listId"
      :aria-activedescendant="
        activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
      "
      autocomplete="off"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="query"
      data-slot="autocomplete-input"
      :class="
        cn(
          'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color]',
          'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
      @input="handleInput"
      @focus="open = true"
      @blur="open = false"
      @keydown="handleKeyDown"
    />

    <ul
      v-if="open"
      :id="listId"
      ref="listRef"
      role="listbox"
      data-slot="autocomplete-list"
      class="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
    >
      <li
        v-if="filtered.length === 0"
        class="px-2 py-3 text-center text-sm text-muted-foreground"
      >
        {{ emptyMessage }}
      </li>
      <template v-else>
        <li
          v-for="(option, index) in filtered"
          :id="`${listId}-option-${index}`"
          :key="option.value"
          role="option"
          :aria-selected="activeIndex === index"
          :data-active="activeIndex === index"
          :class="
            cn(
              'cursor-pointer rounded-sm px-2 py-1.5 text-sm',
              activeIndex === index && 'bg-accent text-accent-foreground',
            )
          "
          @mousedown.prevent="select(option)"
        >
          {{ option.label }}
        </li>
      </template>
    </ul>
  </div>
</template>
