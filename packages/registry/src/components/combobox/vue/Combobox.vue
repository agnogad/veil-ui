<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "reka-ui";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ComboboxOption } from "./types";

const props = withDefaults(
  defineProps<{
    options: ComboboxOption[];
    defaultValue?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    placeholder: "Select an option",
    searchPlaceholder: "Search…",
    emptyMessage: "No results found.",
    label: "Search options",
    disabled: false,
  },
);

const model = defineModel<string>();
const open = ref(false);

const current = computed(() => model.value ?? props.defaultValue);
const selected = computed(() =>
  props.options.find((option) => option.value === current.value),
);
</script>

<template>
  <ComboboxRoot
    v-model="model"
    v-model:open="open"
    :disabled="disabled"
    :open-on-click="true"
    data-slot="combobox"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          :aria-label="label"
          :aria-expanded="open"
          :disabled="disabled"
          :class="
            cn(
              'w-full justify-between font-normal',
              !selected && 'text-muted-foreground',
              props.class,
            )
          "
        >
          <span class="truncate">{{ selected?.label ?? placeholder }}</span>
          <ChevronsUpDown class="size-4 opacity-50" aria-hidden="true" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        data-slot="combobox-content"
        position="popper"
        align="start"
        :side-offset="4"
        :aria-label="label"
        :class="
          cn(
            'z-50 w-[var(--reka-combobox-trigger-width)] rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--reka-combobox-content-transform-origin)]',
          )
        "
      >
        <div class="border-b px-3">
          <ComboboxInput
            auto-focus
            :placeholder="searchPlaceholder"
            :aria-label="label"
            class="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <ComboboxViewport class="max-h-60 overflow-y-auto p-1">
          <ComboboxEmpty class="py-4 text-center text-sm text-muted-foreground">
            {{ emptyMessage }}
          </ComboboxEmpty>
          <ComboboxItem
            v-for="option in options"
            :key="option.value"
            v-slot="{ selected: isSelected }"
            :value="option.value"
            :disabled="option.disabled"
            :text-value="option.label"
            class="flex cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <span>{{ option.label }}</span>
            <Check
              aria-hidden="true"
              :class="cn('size-4', isSelected ? 'opacity-100' : 'opacity-0')"
            />
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
