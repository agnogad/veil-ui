<script setup lang="ts">
import { Play } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    title: string;
    duration?: string;
    class?: string;
  }>(),
  { alt: "" },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <button
    type="button"
    data-slot="video-thumbnail"
    :aria-label="`Play ${title}`"
    :class="
      cn(
        'group relative block w-full max-w-xs overflow-hidden rounded-lg border text-left outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class,
      )
    "
    @click="emit('click', $event)"
  >
    <img
      :src="src"
      :alt="alt || title"
      loading="lazy"
      class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <span
      class="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35"
    >
      <span class="flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow">
        <Play class="ml-0.5 size-5" aria-hidden="true" />
      </span>
    </span>
    <span
      v-if="duration"
      class="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white"
    >
      {{ duration }}
    </span>
    <span class="block truncate px-3 py-2 text-sm font-medium">{{ title }}</span>
  </button>
</template>
