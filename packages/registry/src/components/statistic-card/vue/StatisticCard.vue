<script setup lang="ts">
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-vue-next";
import { computed, type Component } from "vue";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    label: string | number;
    value: string | number;
    delta?: number;
    deltaLabel?: string;
    trend?: "up" | "down" | "neutral";
    icon?: Component;
    class?: string;
  }>(),
  { deltaLabel: "vs last month", trend: "neutral" },
);

const trendIcon = computed(() =>
  props.trend === "up"
    ? ArrowUpRight
    : props.trend === "down"
      ? ArrowDownRight
      : ArrowRight,
);

const trendColor = computed(() =>
  props.trend === "up"
    ? "text-emerald-600 dark:text-emerald-400"
    : props.trend === "down"
      ? "text-red-600 dark:text-red-400"
      : "text-muted-foreground",
);
</script>

<template>
  <Card data-slot="statistic-card" :class="cn('max-w-xs gap-2', props.class)">
    <CardContent class="space-y-1">
      <div
        class="flex items-center justify-between gap-2 text-sm text-muted-foreground"
      >
        <span>{{ label }}</span>
        <component :is="icon" v-if="icon" class="size-4" aria-hidden="true" />
      </div>
      <p class="text-2xl font-semibold tracking-tight">{{ value }}</p>
      <p v-if="delta !== undefined" class="flex items-center gap-1 text-xs">
        <span :class="cn('flex items-center gap-0.5 font-medium', trendColor)">
          <component
            :is="trendIcon"
            class="size-3.5"
            aria-hidden="true"
          />
          {{ delta > 0 ? "+" : "" }}{{ delta }}%
        </span>
        <span class="text-muted-foreground">{{ deltaLabel }}</span>
      </p>
    </CardContent>
  </Card>
</template>
