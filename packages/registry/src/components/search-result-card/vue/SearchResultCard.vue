<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    title: string;
    url: string;
    snippet: string;
    breadcrumb?: string;
    href?: string;
    class?: string;
  }>(),
  { href: "#" },
);
</script>

<template>
  <article
    data-slot="search-result-card"
    :class="cn('group max-w-2xl space-y-1', props.class)"
  >
    <div class="flex items-center gap-2 text-xs text-muted-foreground">
      <span v-if="breadcrumb">{{ breadcrumb }}</span>
      <span class="truncate">{{ url }}</span>
    </div>
    <h3 class="text-base font-medium">
      <a
        :href="href"
        class="text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
      >
        <slot name="title">{{ title }}</slot>
      </a>
    </h3>
    <p class="line-clamp-2 text-sm text-muted-foreground">
      <slot name="snippet">{{ snippet }}</slot>
    </p>
    <div v-if="$slots.meta" class="text-xs text-muted-foreground">
      <slot name="meta" />
    </div>
  </article>
</template>
