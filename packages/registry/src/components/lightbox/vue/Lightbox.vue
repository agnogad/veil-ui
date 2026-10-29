<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from "reka-ui";
import { ChevronLeft, ChevronRight, X } from "lucide-vue-next";
import { computed, ref, useSlots } from "vue";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { LightboxImage } from "./types";

const props = withDefaults(
  defineProps<{
    images: LightboxImage[];
    index?: number;
    defaultIndex?: number;
    open?: boolean;
    defaultOpen?: boolean;
    label?: string;
    class?: string;
  }>(),
  { defaultIndex: 0, label: "Image viewer" },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  "update:index": [value: number];
  "index-change": [value: number];
}>();

const slots = useSlots();
const internalIndex = ref(props.defaultIndex);

const current = computed(() =>
  Math.min(
    props.index ?? internalIndex.value,
    Math.max(props.images.length - 1, 0),
  ),
);

const image = computed(() => props.images[current.value]);

function setIndex(next: number) {
  const total = props.images.length;
  if (total === 0) return;

  const wrapped = ((next % total) + total) % total;
  if (props.index === undefined) internalIndex.value = wrapped;
  emit("update:index", wrapped);
  emit("index-change", wrapped);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setIndex(current.value - 1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    setIndex(current.value + 1);
  }
}

const navButtonClasses = cn(
  "size-9 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
);
</script>

<template>
  <DialogRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <DialogTrigger v-if="slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <DialogContent
        :aria-label="props.label"
        data-slot="lightbox"
        :class="
          cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 p-6 outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            props.class,
          )
        "
        @keydown="onKeyDown"
      >
        <img
          v-if="image"
          :src="image.src"
          :alt="image.alt"
          class="max-h-[80vh] max-w-full rounded-md object-contain"
        />
        <p v-else class="text-sm text-white/70">No images to show.</p>

        <div class="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous image"
            :class="navButtonClasses"
            @click="setIndex(current - 1)"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <p
            aria-live="polite"
            class="min-w-16 text-center text-sm tabular-nums text-white/80"
          >
            {{
              props.images.length === 0
                ? "0 / 0"
                : `${current + 1} / ${props.images.length}`
            }}
          </p>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next image"
            :class="navButtonClasses"
            @click="setIndex(current + 1)"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>

        <DialogClose
          aria-label="Close lightbox"
          class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <X class="size-4" aria-hidden="true" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
