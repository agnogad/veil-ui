<script setup lang="ts">
import { Check, Copy } from "lucide-vue-next";
import { computed, onBeforeUnmount, ref } from "vue";

import { cn } from "@/lib/utils";

import { iconButtonVariants, type IconButtonVariants } from "./variants";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Text written to the clipboard. */
    value: string;
    /** Accessible name before copying. */
    label?: string;
    /** Accessible name and announcement after copying. */
    copiedLabel?: string;
    /** How long the copied state lasts, in milliseconds. */
    timeout?: number;
    variant?: IconButtonVariants["variant"];
    size?: IconButtonVariants["size"];
    class?: string;
  }>(),
  {
    label: "Copy",
    copiedLabel: "Copied",
    timeout: 1600,
    variant: "default",
    size: "default",
  },
);

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const classes = computed(() =>
  cn(iconButtonVariants({ variant: props.variant, size: props.size }), props.class),
);

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.value);
    copied.value = true;
    clearTimer();
    timer = setTimeout(() => {
      copied.value = false;
      timer = null;
    }, props.timeout);
  } catch {
    copied.value = false;
  }
}

onBeforeUnmount(clearTimer);
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    data-slot="copy-button"
    :data-copied="copied ? '' : undefined"
    :aria-label="copied ? copiedLabel : label"
    :class="classes"
    @click="handleCopy"
  >
    <Check v-if="copied" aria-hidden />
    <Copy v-else aria-hidden />
  </button>
  <span aria-live="polite" class="sr-only">
    {{ copied ? copiedLabel : "" }}
  </span>
</template>
