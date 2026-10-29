<script setup lang="ts">
import { computed } from "vue";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  label: string;
  value: string | number;
  target: number;
  current: number;
  unit?: string;
  description?: string;
  class?: string;
}>();

const percentage = computed(() =>
  props.target <= 0
    ? 0
    : Math.min(100, Math.max(0, Math.round((props.current / props.target) * 100))),
);
</script>

<template>
  <Card data-slot="metric-card" :class="cn('max-w-sm gap-2', props.class)">
    <CardContent class="space-y-3">
      <div class="flex items-baseline justify-between gap-2">
        <span class="text-sm text-muted-foreground">{{ label }}</span>
        <span class="text-xs text-muted-foreground">{{ percentage }}%</span>
      </div>
      <p class="text-2xl font-semibold tracking-tight">
        {{ value }}<span
          v-if="unit"
          class="ml-1 text-sm font-normal text-muted-foreground"
        >{{ unit }}</span>
      </p>
      <div
        role="progressbar"
        :aria-label="label"
        :aria-valuemin="0"
        :aria-valuemax="target"
        :aria-valuenow="current"
        class="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          class="h-full rounded-full bg-primary transition-all"
          :style="{ width: `${percentage}%` }"
        />
      </div>
      <p v-if="description" class="text-xs text-muted-foreground">
        {{ description }}
      </p>
    </CardContent>
  </Card>
</template>
