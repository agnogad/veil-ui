<script setup lang="ts">
import { computed, ref, useId } from "vue";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { CheckboxGroupOption } from "./types";

const props = withDefaults(
  defineProps<{
    options: CheckboxGroupOption[];
    modelValue?: string[];
    defaultValue?: string[];
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { defaultValue: () => [], disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [value: string[]] }>();

const id = useId();
const internal = ref<string[]>([...props.defaultValue]);
const selected = computed(() => props.modelValue ?? internal.value);

function toggle(value: string, checked: boolean | "indeterminate") {
  const next =
    checked === true
      ? [...selected.value, value]
      : selected.value.filter((item) => item !== value);

  if (props.modelValue === undefined) internal.value = next;
  emit("update:modelValue", next);
}
</script>

<template>
  <fieldset
    data-slot="checkbox-group"
    :disabled="disabled"
    :class="cn('grid gap-3', props.class)"
  >
    <legend v-if="label" class="mb-1 text-sm font-medium">{{ label }}</legend>
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-start gap-2"
    >
      <Checkbox
        :id="`${id}-${option.value}`"
        :model-value="selected.includes(option.value)"
        :disabled="disabled || option.disabled"
        class="mt-0.5"
        @update:model-value="(checked) => toggle(option.value, checked)"
      />
      <div class="grid gap-0.5">
        <Label :for="`${id}-${option.value}`">{{ option.label }}</Label>
        <p v-if="option.description" class="text-sm text-muted-foreground">
          {{ option.description }}
        </p>
      </div>
    </div>
  </fieldset>
</template>
