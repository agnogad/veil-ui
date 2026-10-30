<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    category?: string;
    title: string;
    excerpt?: string;
    author: string;
    date: string;
    readTime?: string;
    href?: string;
    class?: string;
  }>(),
  { alt: "", href: "#" },
);
</script>

<template>
  <Card
    data-slot="article-card"
    :class="cn('max-w-md overflow-hidden py-0', props.class)"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      loading="lazy"
      class="aspect-[2/1] w-full object-cover"
    />
    <CardHeader class="pt-5">
      <span
        v-if="category"
        class="text-xs font-medium uppercase tracking-wide text-primary"
      >
        {{ category }}
      </span>
      <CardTitle class="text-lg leading-snug">
        <a
          class="outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          :href="href"
        >
          <slot name="title">{{ title }}</slot>
        </a>
      </CardTitle>
      <CardDescription v-if="excerpt || $slots.excerpt" class="line-clamp-2">
        <slot name="excerpt">{{ excerpt }}</slot>
      </CardDescription>
    </CardHeader>
    <div
      class="flex flex-wrap items-center gap-x-2 gap-y-1 border-t px-5 py-3 text-xs text-muted-foreground"
    >
      <span class="font-medium text-foreground">{{ author }}</span>
      <span aria-hidden="true">·</span>
      <time>{{ date }}</time>
      <template v-if="readTime">
        <span aria-hidden="true">·</span>
        <span>{{ readTime }}</span>
      </template>
    </div>
  </Card>
</template>
