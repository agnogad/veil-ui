<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

import { cn } from "@/lib/utils";

import type {
  ConnectionStatusProps,
  ConnectionStatusValue,
} from "./types";

const statuses: Record<
  ConnectionStatusValue,
  { label: string; dot: string; text: string }
> = {
  online: {
    label: "Connected",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  offline: {
    label: "Disconnected",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
  },
  connecting: {
    label: "Connecting",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
  reconnecting: {
    label: "Reconnecting",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
};

const props = defineProps<ConnectionStatusProps>();

const detected = ref<ConnectionStatusValue>(
  typeof navigator !== "undefined" && navigator.onLine === false
    ? "offline"
    : "online",
);
let connectTimer: ReturnType<typeof setTimeout> | null = null;

const current = computed<ConnectionStatusValue>(
  () => props.status ?? detected.value,
);
const isPending = computed(
  () => current.value === "connecting" || current.value === "reconnecting",
);
const config = computed(() => statuses[current.value]);

function clearTimer() {
  if (connectTimer) {
    clearTimeout(connectTimer);
    connectTimer = null;
  }
}

function handleOnline() {
  clearTimer();
  detected.value = "connecting";
  connectTimer = setTimeout(() => {
    detected.value = "online";
    connectTimer = null;
  }, 600);
}

function handleOffline() {
  clearTimer();
  detected.value = "offline";
}

let listening = false;

function attach() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
}

function detach() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
}

onMounted(() => {
  if (props.status === undefined) attach();
});

watch(
  () => props.status,
  (value) => {
    if (value === undefined) attach();
    else detach();
  },
);

onBeforeUnmount(() => {
  clearTimer();
  detach();
});
</script>

<template>
  <span
    data-slot="connection-status"
    :data-status="current"
    role="status"
    aria-live="polite"
    :class="cn('inline-flex items-center gap-1.5 text-xs', config.text, props.class)"
  >
    <span aria-hidden class="relative flex size-2">
      <span
        v-if="isPending"
        :class="
          cn(
            'absolute inline-flex size-full animate-ping rounded-full opacity-60',
            config.dot,
          )
        "
      />
      <span :class="cn('relative inline-flex size-2 rounded-full', config.dot)" />
    </span>
    {{ label ?? config.label }}
  </span>
</template>
