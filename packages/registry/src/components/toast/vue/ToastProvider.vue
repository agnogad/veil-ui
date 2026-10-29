<script setup lang="ts">
import { ToastProvider as RekaToastProvider } from "reka-ui";

import type { ToastSwipeDirection } from "./types";
import { provideToast } from "./use-toast";

const props = withDefaults(
  defineProps<{
    /** Default auto-dismiss delay for every toast in this provider. */
    duration?: number;
    /** Screen-reader label for the toast region. */
    label?: string;
    /** Direction of the pointer swipe that closes a toast. */
    swipeDirection?: ToastSwipeDirection;
  }>(),
  { duration: 5000, label: "Notification", swipeDirection: "right" },
);

provideToast();
</script>

<template>
  <RekaToastProvider
    :duration="props.duration"
    :label="props.label"
    :swipe-direction="props.swipeDirection"
  >
    <slot />
  </RekaToastProvider>
</template>
