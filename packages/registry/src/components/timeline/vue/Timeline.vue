<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { TimelineItem } from "./types";

const props = defineProps<{
  items: TimelineItem[];
  class?: string;
}>();

const statusClass: Record<NonNullable<TimelineItem["status"]>, string> = {
  default: "bg-primary text-primary-foreground",
  success: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-white",
  destructive: "bg-red-600 text-white",
};
</script>

<template>
  <ol data-slot="timeline" :class="cn('relative grid gap-6', props.class)">
    <li v-for="(item, index) in items" :key="index" class="relative flex gap-4">
      <div class="flex flex-col items-center">
        <span
          :class="
            cn(
              'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium',
              statusClass[item.status ?? 'default'],
            )
          "
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            class="size-3.5"
            aria-hidden="true"
          />
          <template v-else>{{ index + 1 }}</template>
        </span>
        <span
          v-if="index !== items.length - 1"
          class="mt-1 w-px flex-1 bg-border"
          aria-hidden="true"
        />
      </div>
      <div class="pb-2">
        <div class="flex flex-wrap items-baseline gap-x-2">
          <h3 class="text-sm font-medium">{{ item.title }}</h3>
          <time v-if="item.time" class="text-xs text-muted-foreground">
            {{ item.time }}
          </time>
        </div>
        <p v-if="item.description" class="mt-1 text-sm text-muted-foreground">
          {{ item.description }}
        </p>
      </div>
    </li>
  </ol>
</template>
