<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui";
import { Check, Minus } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; disabled?: boolean }>();

const model = defineModel<boolean | "indeterminate">({ default: false });
</script>

<template>
  <CheckboxRoot
    v-model="model"
    data-slot="checkbox"
    :disabled="disabled"
    :class="
      cn(
        'peer size-4 shrink-0 rounded-sm border border-input shadow-xs outline-none transition-[color,background-color,border-color,box-shadow]',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        props.class,
      )
    "
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="flex items-center justify-center text-current"
    >
      <Minus v-if="model === 'indeterminate'" class="size-3.5" />
      <Check v-else class="size-3.5" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
