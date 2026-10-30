<script setup lang="ts">
import type { Component } from "vue";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

interface SwipeableAction {
  label: string;
  icon?: Component;
  onClick: () => void;
  destructive?: boolean;
}

const props = withDefaults(
  defineProps<{
    actions: SwipeableAction[];
    actionWidth?: number;
    class?: string;
  }>(),
  { actionWidth: 72 },
);

const offset = ref(0);
const dragging = ref(false);
const startX = ref(0);
const baseOffset = ref(0);

const total = computed(() => props.actions.length * props.actionWidth);

function clamp(value: number) {
  return Math.min(0, Math.max(-total.value, value));
}

function pointerDown(event: PointerEvent) {
  dragging.value = true;
  startX.value = event.clientX;
  baseOffset.value = offset.value;
}

function pointerMove(event: PointerEvent) {
  if (!dragging.value) return;
  offset.value = clamp(baseOffset.value + (event.clientX - startX.value));
}

function settle() {
  if (!dragging.value) return;
  dragging.value = false;
  offset.value = offset.value < -total.value / 3 ? -total.value : 0;
}
</script>

<template>
  <div
    data-slot="swipeable-row"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <div class="absolute inset-y-0 right-0 flex">
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        :style="{ width: `${actionWidth}px` }"
        :class="
          cn(
            'flex flex-col items-center justify-center gap-1 text-xs font-medium text-primary-foreground [&_svg]:size-4',
            action.destructive ? 'bg-destructive' : 'bg-primary',
          )
        "
        @click="action.onClick"
      >
        <component :is="action.icon" v-if="action.icon" aria-hidden="true" />
        {{ action.label }}
      </button>
    </div>
    <div
      class="relative z-10 bg-background transition-transform duration-200 ease-out will-change-transform"
      :style="{ transform: `translateX(${offset}px)`, touchAction: 'pan-y' }"
      @pointerdown="pointerDown"
      @pointermove="pointerMove"
      @pointerup="settle"
      @pointerleave="settle"
      @pointercancel="offset = 0; dragging = false"
    >
      <slot />
    </div>
  </div>
</template>
