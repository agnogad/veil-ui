<script setup lang="ts">
import { GripVertical } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

import { useResizable } from "./use-resizable";

const props = withDefaults(
  defineProps<{
    withHandle?: boolean;
    class?: string;
  }>(),
  { withHandle: false },
);

const { orientation, sizes, container, registerHandle } = useResizable();
const index = registerHandle();
const dragging = ref(false);

const style = computed(() =>
  orientation.value === "vertical"
    ? { cursor: "row-resize" }
    : { cursor: "col-resize" },
);

function onPointerDown(event: PointerEvent) {
  event.preventDefault();
  dragging.value = true;
  const element = container.value;
  const startX = event.clientX;
  const startY = event.clientY;
  const size =
    orientation.value === "horizontal"
      ? (element?.clientWidth ?? 1)
      : (element?.clientHeight ?? 1);
  const first = sizes.value[index] ?? 50;
  const second = sizes.value[index + 1] ?? 50;
  const total = first + second;
  const minimum = Math.min(10, total / 2);

  function onMove(move: PointerEvent) {
    const delta =
      orientation.value === "horizontal"
        ? move.clientX - startX
        : move.clientY - startY;
    const next = Math.min(
      Math.max(first + (delta / Math.max(size, 1)) * 100, minimum),
      total - minimum,
    );
    sizes.value[index] = next;
    sizes.value[index + 1] = total - next;
  }

  function onUp() {
    dragging.value = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  }

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}
</script>

<template>
  <div
    data-slot="resizable-handle"
    role="separator"
    :aria-orientation="orientation"
    :tabindex="0"
    :style="style"
    :class="
      cn(
        'group relative flex items-center justify-center bg-border outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50',
        orientation === 'horizontal' ? 'w-px' : 'h-px w-full',
        props.class,
      )
    "
    @pointerdown="onPointerDown"
  >
    <div
      v-if="withHandle"
      class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
    >
      <GripVertical class="size-2.5" aria-hidden="true" />
    </div>
  </div>
</template>
