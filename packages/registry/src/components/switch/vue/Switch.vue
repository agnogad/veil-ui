<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import {
  switchThumbVariants,
  switchVariants,
  type SwitchVariants,
} from "./variants";

const props = defineProps<{
  class?: string;
  size?: SwitchVariants["size"];
  disabled?: boolean;
}>();

const model = defineModel<boolean>({ default: false });

const rootClasses = computed(() =>
  cn(switchVariants({ size: props.size }), props.class),
);
const thumbClasses = computed(() => switchThumbVariants({ size: props.size }));
</script>

<template>
  <SwitchRoot
    v-model="model"
    data-slot="switch"
    :data-size="size ?? 'default'"
    :disabled="disabled"
    :class="rootClasses"
  >
    <SwitchThumb data-slot="switch-thumb" :class="thumbClasses" />
  </SwitchRoot>
</template>
