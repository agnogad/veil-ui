<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { BentoGridProps } from "./types";

const props = defineProps<BentoGridProps>();
</script>

<template>
  <div
    data-slot="bento-grid"
    :class="
      cn(
        'grid auto-rows-min gap-3 sm:grid-cols-2 lg:grid-cols-4',
        props.class,
      )
    "
  >
    <div
      v-for="(item, index) in props.items"
      :key="item.title"
      :class="
        cn(
          'flex flex-col gap-3 rounded-xl border bg-background p-5 shadow-xs',
          index === 0 && 'sm:col-span-2 sm:row-span-2',
          item.className,
        )
      "
    >
      <span
        v-if="item.icon"
        class="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4"
      >
        <component :is="item.icon" />
      </span>
      <div>
        <h3 class="text-sm font-semibold">{{ item.title }}</h3>
        <p v-if="item.description" class="mt-1 text-sm text-muted-foreground">
          {{ item.description }}
        </p>
      </div>
      <div v-if="item.media" class="mt-auto">
        <component :is="item.media" />
      </div>
    </div>
  </div>
</template>
