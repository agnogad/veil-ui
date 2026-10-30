<script setup lang="ts">
import { X } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    threshold?: number;
    dismissLabel?: string;
    class?: string;
  }>(),
  { threshold: 96, dismissLabel: "Dismiss" },
);

const emit = defineEmits<{ dismiss: [] }>();

const offset = ref(0);
const dragging = ref(false);
const startX = ref(0);

const style = computed(() => ({
  opacity: 1 - Math.min(Math.abs(offset.value) / (props.threshold * 2), 0.7),
}));

function pointerDown(event: PointerEvent) {
  dragging.value = true;
  startX.value = event.clientX;
}

function pointerMove(event: PointerEvent) {
  if (!dragging.value) return;
  offset.value = event.clientX - startX.value;
}

function pointerUp() {
  if (!dragging.value) return;
  dragging.value = false;
  if (Math.abs(offset.value) >= props.threshold) emit("dismiss");
  offset.value = 0;
}
</script>

<template>
  <div
    data-slot="swipe-to-dismiss"
    :class="cn('relative rounded-lg border bg-background transition-opacity', props.class)"
    :style="style"
  >
    <div
      class="transition-transform duration-200 ease-out will-change-transform"
      :style="{ transform: `translateX(${offset}px)`, touchAction: 'pan-y' }"
      @pointerdown="pointerDown"
      @pointermove="pointerMove"
      @pointerup="pointerUp"
      @pointercancel="pointerUp"
    >
      <slot />
    </div>
    <button
      type="button"
      :aria-label="dismissLabel"
      class="absolute right-2 top-2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      @click="emit('dismiss')"
    >
      <X class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
