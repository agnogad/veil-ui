<script setup lang="ts">
import { Toggle } from "reka-ui";

import { cn } from "@/lib/utils";

import { toggleVariants, type ToggleVariants } from "./variants";

const props = withDefaults(
  defineProps<{
    class?: string;
    variant?: ToggleVariants["variant"];
    size?: ToggleVariants["size"];
    disabled?: boolean;
    defaultValue?: boolean;
  }>(),
  { disabled: false },
);

const model = defineModel<boolean>();
</script>

<template>
  <Toggle
    v-model="model"
    data-slot="toggle"
    :default-value="defaultValue"
    :disabled="disabled"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot />
  </Toggle>
</template>
