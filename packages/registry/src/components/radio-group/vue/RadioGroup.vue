<script setup lang="ts">
import { RadioGroupRoot } from "reka-ui";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    defaultValue?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    loop?: boolean;
    name?: string;
    required?: boolean;
  }>(),
  { disabled: false, loop: true },
);

const model = defineModel<string>();
</script>

<template>
  <RadioGroupRoot
    v-model="model"
    data-slot="radio-group"
    :default-value="defaultValue"
    :disabled="disabled"
    :orientation="orientation"
    :loop="loop"
    :name="name"
    :required="required"
    :class="cn('grid gap-2', props.class)"
  >
    <slot />
  </RadioGroupRoot>
</template>
