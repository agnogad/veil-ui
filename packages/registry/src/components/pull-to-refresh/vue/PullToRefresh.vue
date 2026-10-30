<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    threshold?: number;
    refreshingLabel?: string;
    class?: string;
  }>(),
  { threshold: 64, refreshingLabel: "Refreshing…" },
);

const emit = defineEmits<{ refresh: [] }>();

const pull = ref(0);
const refreshing = ref(false);
const startY = ref<number | null>(null);

const ready = computed(() => pull.value >= props.threshold);

async function trigger() {
  if (refreshing.value) return;
  refreshing.value = true;
  try {
    await emit("refresh");
  } finally {
    refreshing.value = false;
    pull.value = 0;
  }
}

function touchStart(event: TouchEvent) {
  if ((event.currentTarget as HTMLElement).scrollTop <= 0) {
    startY.value = event.touches[0]?.clientY ?? null;
  }
}

function touchMove(event: TouchEvent) {
  if (startY.value === null) return;
  const delta = (event.touches[0]?.clientY ?? 0) - startY.value;
  if (delta > 0) pull.value = Math.min(delta * 0.5, 96);
}

function touchEnd() {
  startY.value = null;
  if (ready.value) void trigger();
  else pull.value = 0;
}
</script>

<template>
  <div data-slot="pull-to-refresh" :class="cn('relative overflow-hidden rounded-lg border', props.class)">
    <div
      aria-live="polite"
      class="absolute inset-x-0 top-0 flex items-center justify-center overflow-hidden text-xs text-muted-foreground"
      :style="{ height: `${refreshing ? 40 : pull}px` }"
    >
      <span v-if="refreshing || pull > 0" class="flex items-center gap-2">
        <Loader2 :class="cn('size-3.5', refreshing && 'animate-spin')" aria-hidden="true" />
        {{ refreshing ? refreshingLabel : ready ? "Release to refresh" : "Pull to refresh" }}
      </span>
    </div>
    <div
      class="max-h-64 overflow-y-auto"
      :style="{ transform: `translateY(${refreshing ? 8 : 0}px)` }"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <div class="flex justify-end border-b px-3 py-2">
        <button type="button" class="sr-only" @click="trigger">Refresh</button>
        <span class="text-[11px] text-muted-foreground">Pull down to refresh</span>
      </div>
      <slot />
    </div>
  </div>
</template>
