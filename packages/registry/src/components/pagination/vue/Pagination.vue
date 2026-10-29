<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { getPages, type PaginationProps } from "./pagination";

const props = withDefaults(defineProps<PaginationProps>(), {
  siblingCount: 1,
  label: "Pagination",
});

const emit = defineEmits<{ "update:page": [page: number] }>();

const pages = computed(() =>
  getPages(props.page, props.totalPages, props.siblingCount),
);

const buttonClasses =
  "inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

function go(next: number) {
  if (next < 1 || next > props.totalPages || next === props.page) return;
  props.onPageChange?.(next);
  emit("update:page", next);
}
</script>

<template>
  <nav
    data-slot="pagination"
    :aria-label="label"
    :class="cn('flex items-center gap-1', props.class)"
  >
    <button
      type="button"
      aria-label="Previous page"
      :disabled="page <= 1"
      :class="cn(buttonClasses, 'border-transparent')"
      @click="go(page - 1)"
    >
      <ChevronLeft class="size-4" aria-hidden="true" />
    </button>
    <template v-for="(token, index) in pages" :key="`${token}-${index}`">
      <span
        v-if="token === 'ellipsis'"
        aria-hidden="true"
        class="px-1 text-sm text-muted-foreground"
      >
        …
      </span>
      <button
        v-else
        type="button"
        :aria-label="`Go to page ${token}`"
        :aria-current="token === page ? 'page' : undefined"
        :class="
          cn(
            buttonClasses,
            token === page &&
              'border-foreground bg-foreground text-background hover:bg-foreground hover:text-background',
          )
        "
        @click="go(Number(token))"
      >
        {{ token }}
      </button>
    </template>
    <button
      type="button"
      aria-label="Next page"
      :disabled="page >= totalPages"
      :class="cn(buttonClasses, 'border-transparent')"
      @click="go(page + 1)"
    >
      <ChevronRight class="size-4" aria-hidden="true" />
    </button>
  </nav>
</template>
