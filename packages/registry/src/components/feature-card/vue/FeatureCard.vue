<script setup lang="ts">
import type { Component } from "vue";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  icon: Component;
  title: string;
  description: string;
  class?: string;
}>();
</script>

<template>
  <Card data-slot="feature-card" :class="cn('max-w-sm gap-3', props.class)">
    <CardContent class="space-y-3">
      <span class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <component :is="icon" class="size-5" aria-hidden="true" />
      </span>
      <h3 class="text-base font-medium">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p class="text-sm text-muted-foreground">
        <slot name="description">{{ description }}</slot>
      </p>
    </CardContent>
  </Card>
</template>
