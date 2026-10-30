<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    hasMore: boolean;
    loading?: boolean;
    loadingMessage?: string;
    endMessage?: string;
    class?: string;
  }>(),
  {
    loading: false,
    loadingMessage: "Loading more…",
    endMessage: "You have reached the end.",
  },
);

const emit = defineEmits<{ loadMore: [] }>();

const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function observe() {
  observer?.disconnect();
  observer = null;
  if (!sentinel.value || !props.hasMore) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !props.loading) emit("loadMore");
    },
    { rootMargin: "120px" },
  );
  observer.observe(sentinel.value);
}

onMounted(observe);
watch(() => [props.hasMore, props.loading], observe);
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div data-slot="infinite-scroll" :class="cn('grid gap-3', props.class)">
    <slot />
    <div
      ref="sentinel"
      aria-live="polite"
      class="flex min-h-10 items-center justify-center text-xs text-muted-foreground"
    >
      <span v-if="loading" class="flex items-center gap-2">
        <Loader2 class="size-3.5 animate-spin" aria-hidden="true" />
        {{ loadingMessage }}
      </span>
      <span v-else-if="hasMore" class="sr-only">Scroll for more content</span>
      <template v-else>{{ endMessage }}</template>
    </div>
  </div>
</template>
