<script setup lang="ts">
import { TabsRoot } from "reka-ui";

import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  activationMode?: "automatic" | "manual";
  asChild?: boolean;
  class?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string | number] }>();
</script>

<template>
  <TabsRoot
    v-bind="$attrs"
    data-slot="tabs"
    :default-value="props.defaultValue"
    :model-value="props.modelValue"
    :orientation="props.orientation"
    :dir="props.dir"
    :activation-mode="props.activationMode"
    :as-child="props.asChild"
    :class="cn('flex flex-col gap-2', props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TabsRoot>
</template>
