<script setup lang="ts">
import type { Component } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  time: string;
  avatarSrc?: string;
  icon?: Component;
}

const props = withDefaults(
  defineProps<{
    items: ActivityItem[];
    label?: string;
    class?: string;
  }>(),
  { label: "Activity feed" },
);

function fallback(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
</script>

<template>
  <Card class="overflow-hidden py-0">
    <ol
      data-slot="activity-feed"
      :aria-label="label"
      :class="cn('divide-y', props.class)"
    >
      <li v-for="item in items" :key="item.id" class="flex gap-3 px-4 py-3">
        <div class="relative">
          <Avatar size="sm">
            <AvatarImage v-if="item.avatarSrc" :src="item.avatarSrc" alt="" />
            <AvatarFallback>{{ fallback(item.actor) }}</AvatarFallback>
          </Avatar>
          <span
            v-if="item.icon"
            class="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border bg-background"
          >
            <component :is="item.icon" class="size-2.5 text-muted-foreground" aria-hidden="true" />
          </span>
        </div>
        <div class="min-w-0 flex-1 text-sm">
          <p class="truncate">
            <span class="font-medium">{{ item.actor }}</span> {{ item.action }}
            <span v-if="item.target" class="font-medium"> {{ item.target }}</span>
          </p>
          <time class="text-xs text-muted-foreground">{{ item.time }}</time>
        </div>
      </li>
    </ol>
  </Card>
</template>
