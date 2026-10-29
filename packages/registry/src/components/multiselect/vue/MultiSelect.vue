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
import { Check, ChevronsUpDown, X } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import type { MultiSelectOption } from "./types";

const props = withDefaults(
  defineProps<{
    options: MultiSelectOption[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    emptyMessage?: string;
    class?: string;
  }>(),
  {
    placeholder: "Select options",
    label: "Options",
    disabled: false,
    emptyMessage: "No results found.",
  },
);

const model = defineModel<string[]>({ default: () => [] });

function remove(value: string) {
  model.value = model.value.filter((item) => item !== value);
}

function clear() {
  model.value = [];
}
</script>

<template>
  <ComboboxRoot
    v-model="model"
    multiple
    :disabled="disabled"
    open-on-click
    open-on-focus
    data-slot="multiselect"
  >
    <ComboboxAnchor as-child>
      <div
        data-slot="multiselect-trigger"
        :class="
          cn(
            'flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color]',
            'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
            'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
            props.class,
          )
        "
      >
        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1">
          <span
            v-for="value in model"
            :key="value"
            data-slot="multiselect-chip"
            class="inline-flex max-w-full items-center gap-1 rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground"
          >
            <span class="truncate">
              {{ options.find((option) => option.value === value)?.label ?? value }}
            </span>
            <button
              type="button"
              :aria-label="`Remove ${options.find((option) => option.value === value)?.label ?? value}`"
              class="rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
              @click.stop="remove(value)"
            >
              <X class="size-3" aria-hidden="true" />
            </button>
          </span>
          <ComboboxInput
            :placeholder="model.length === 0 ? placeholder : ''"
            :aria-label="label"
            :disabled="disabled"
            class="h-6 min-w-16 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          />
        </div>
        <ComboboxTrigger
          :disabled="disabled"
          class="inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <ChevronsUpDown class="size-4 opacity-50" aria-hidden="true" />
        </ComboboxTrigger>
      </div>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        data-slot="multiselect-content"
        position="popper"
        align="start"
        :side-offset="4"
        :aria-label="label"
        :class="
          cn(
            'z-50 w-[var(--reka-combobox-trigger-width)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--reka-combobox-content-transform-origin)]',
          )
        "
      >
        <p class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {{ label }}
        </p>
        <ComboboxViewport class="max-h-60 overflow-y-auto p-1">
          <ComboboxEmpty class="py-4 text-center text-sm text-muted-foreground">
            {{ emptyMessage }}
          </ComboboxEmpty>
          <ComboboxItem
            v-for="option in options"
            :key="option.value"
            v-slot="{ selected }"
            :value="option.value"
            :disabled="option.disabled"
            :text-value="option.label"
            :class="
              cn(
                'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
                'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              )
            "
          >
            <span
              class="flex size-4 shrink-0 items-center justify-center rounded-sm border border-input shadow-xs"
              :class="
                selected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-transparent'
              "
              aria-hidden="true"
            >
              <Check v-if="selected" class="size-3.5" />
            </span>
            <span class="flex-1 truncate">{{ option.label }}</span>
          </ComboboxItem>
        </ComboboxViewport>
        <div v-if="model.length > 0" class="mt-1 border-t pt-1">
          <button
            type="button"
            class="flex w-full items-center justify-start rounded-sm px-2 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            @click="clear"
          >
            Clear selection
          </button>
        </div>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
