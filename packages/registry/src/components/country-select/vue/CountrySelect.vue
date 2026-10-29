<script setup lang="ts">
import { ChevronsUpDown } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

import {
  countries as defaultCountries,
  flagEmoji,
  type Country,
} from "./countries";

const props = withDefaults(
  defineProps<{
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    /** Override the built-in country list. */
    countries?: Country[];
    placeholder?: string;
    /** Accessible name for the select. */
    label?: string;
    /** Show the full name or just the dial code. */
    display?: "name" | "dial";
    disabled?: boolean;
    class?: string;
  }>(),
  {
    countries: () => defaultCountries,
    placeholder: "Select a country",
    label: "Country",
    display: "name",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [code: string];
  valueChange: [code: string];
}>();

const internal = ref<string | undefined>(props.defaultValue);
const current = computed(
  () => props.value ?? props.modelValue ?? internal.value,
);
const options = computed(() => props.countries);
const selected = computed(() =>
  options.value.find((country) => country.code === current.value),
);

function onChange(event: Event) {
  const code = (event.target as HTMLSelectElement).value;
  if (!code) return;
  internal.value = code;
  emit("update:modelValue", code);
  emit("valueChange", code);
}
</script>

<template>
  <div
    data-slot="country-select"
    :class="
      cn(
        'relative inline-flex items-center',
        display === 'name' ? 'w-60' : 'w-28',
        props.class,
      )
    "
  >
    <span
      v-if="selected"
      aria-hidden="true"
      class="pointer-events-none absolute left-3 text-base leading-none"
    >
      {{ flagEmoji(selected.code) }}
    </span>
    <select
      :aria-label="label"
      :value="current ?? ''"
      :disabled="disabled"
      :class="
        cn(
          'h-9 w-full appearance-none rounded-md border border-input bg-background py-2 pr-9 text-sm shadow-xs outline-none transition-[color,background-color,border-color,box-shadow]',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          selected ? 'pl-9' : 'pl-3',
          !selected && 'text-muted-foreground',
        )
      "
      @change="onChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="country in options"
        :key="country.code"
        :value="country.code"
      >
        {{
          display === "name"
            ? `${country.name} (${country.dial})`
            : country.dial
        }}
      </option>
    </select>
    <ChevronsUpDown
      class="pointer-events-none absolute right-3 size-4 shrink-0 opacity-50"
      aria-hidden
    />
  </div>
</template>
