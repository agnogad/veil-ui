<script setup lang="ts">
import { Check, Pipette } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const defaultPresets = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const props = withDefaults(
  defineProps<{
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    presets?: string[];
    /** Accessible name for the trigger and controls. */
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    defaultValue: "#3b82f6",
    label: "Choose color",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  valueChange: [value: string];
}>();

const open = ref(false);
const internal = ref(props.defaultValue);
const draft = ref<string | null>(null);

const current = computed(
  () => props.value ?? props.modelValue ?? internal.value,
);
const swatches = computed(() => props.presets ?? defaultPresets);

function normalizeHex(input: string) {
  const raw = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(raw)) {
    return `#${raw
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }
  if (/^[0-9a-f]{6}$/.test(raw)) return `#${raw}`;
  return null;
}

function commit(next: string) {
  const normalized = normalizeHex(next);
  if (!normalized) return false;
  internal.value = normalized;
  emit("update:modelValue", normalized);
  emit("valueChange", normalized);
  draft.value = null;
  return true;
}

function commitDraft() {
  if (draft.value === null) return;
  if (!commit(draft.value)) draft.value = null;
}

function onHexKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    commitDraft();
  }
  if (event.key === "Escape") draft.value = null;
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        type="button"
        variant="outline"
        :aria-label="label"
        aria-haspopup="dialog"
        :aria-expanded="open"
        :disabled="disabled"
        :class="cn('w-44 justify-start gap-2 font-normal', props.class)"
      >
        <span
          aria-hidden="true"
          class="size-4 rounded-sm border"
          :style="{ backgroundColor: current }"
        />
        <span class="uppercase tabular-nums">{{ current }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      data-slot="color-picker-content"
      :aria-label="label"
      align="start"
      :side-offset="4"
      class="w-60 p-3"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">{{ label }}</span>
        <Pipette class="size-4 text-muted-foreground" aria-hidden />
      </div>

      <input
        type="color"
        :aria-label="`${label}, native picker`"
        :value="current"
        :disabled="disabled"
        class="mt-3 h-9 w-full cursor-pointer rounded-md border border-input bg-transparent p-1"
        @input="commit(($event.target as HTMLInputElement).value)"
      />

      <input
        type="text"
        :aria-label="`${label}, hex value`"
        :value="draft ?? current"
        spellcheck="false"
        :disabled="disabled"
        class="mt-3 h-9 w-full rounded-md border border-input bg-transparent px-3 font-mono text-sm uppercase outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        @input="draft = ($event.target as HTMLInputElement).value"
        @blur="commitDraft"
        @keydown="onHexKeydown"
      />

      <div
        role="group"
        aria-label="Preset colors"
        class="mt-3 grid grid-cols-5 gap-2"
      >
        <button
          v-for="preset in swatches"
          :key="preset"
          type="button"
          :aria-label="`Use ${preset}`"
          :aria-pressed="preset.toLowerCase() === current.toLowerCase()"
          :style="{ backgroundColor: preset }"
          class="flex size-8 items-center justify-center rounded-md border outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
          @click="commit(preset)"
        >
          <Check
            v-if="preset.toLowerCase() === current.toLowerCase()"
            :class="
              cn(
                'size-4',
                preset === '#ffffff' || preset === '#fef08a'
                  ? 'text-black'
                  : 'text-white',
              )
            "
            aria-hidden
          />
        </button>
      </div>
    </PopoverContent>
  </PopoverRoot>
</template>
