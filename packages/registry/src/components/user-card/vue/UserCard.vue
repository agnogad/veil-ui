<script setup lang="ts">
import { computed } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  name: string;
  handle: string;
  bio?: string;
  avatarSrc?: string;
  stats?: { label: string; value: string | number }[];
  class?: string;
}>();

const fallback = computed(() =>
  props.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
);
</script>

<template>
  <Card data-slot="user-card" :class="cn('max-w-sm gap-3', props.class)">
    <CardContent class="flex items-start gap-3">
      <Avatar size="lg">
        <AvatarImage v-if="avatarSrc" :src="avatarSrc" alt="" />
        <AvatarFallback>{{ fallback }}</AvatarFallback>
      </Avatar>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">{{ name }}</p>
            <p class="truncate text-xs text-muted-foreground">@{{ handle }}</p>
          </div>
          <slot name="action" />
        </div>
        <p v-if="bio" class="mt-2 text-sm text-muted-foreground">{{ bio }}</p>
      </div>
    </CardContent>
    <CardContent
      v-if="stats?.length"
      class="flex gap-6 border-t pt-3 text-sm"
    >
      <span v-for="stat in stats" :key="stat.label">
        <strong class="font-semibold text-foreground">{{ stat.value }}</strong>
        <span class="text-muted-foreground"> {{ stat.label }}</span>
      </span>
    </CardContent>
  </Card>
</template>
