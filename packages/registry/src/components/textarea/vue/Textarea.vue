<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: string;
  modelValue?: string | number;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const value = computed(() => props.modelValue ?? "");
</script>

<template>
  <textarea
    :value="value"
    data-slot="textarea"
    :class="
      cn(
        'flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color]',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'field-sizing-content dark:bg-input/30',
        props.class,
      )
    "
    @input="
      emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
  />
</template>
