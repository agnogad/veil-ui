<script setup lang="ts">
import { Check } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    ctaLabel?: string;
    highlighted?: boolean;
    badge?: string;
    class?: string;
  }>(),
  { period: "/month", ctaLabel: "Choose plan", highlighted: false },
);

const emit = defineEmits<{ select: [] }>();
</script>

<template>
  <Card
    data-slot="pricing-card"
    :data-highlighted="highlighted || undefined"
    :class="
      cn(
        'max-w-sm',
        highlighted && 'border-primary shadow-md ring-1 ring-primary',
        props.class,
      )
    "
  >
    <CardHeader>
      <div class="flex items-center justify-between gap-2">
        <CardTitle>{{ name }}</CardTitle>
        <span
          v-if="badge"
          class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
        >
          {{ badge }}
        </span>
      </div>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
      <p class="flex items-baseline gap-1 pt-2">
        <span class="text-3xl font-semibold tracking-tight">{{ price }}</span>
        <span class="text-sm text-muted-foreground">{{ period }}</span>
      </p>
    </CardHeader>
    <CardContent class="grid gap-4">
      <ul class="grid gap-2 text-sm">
        <li v-for="feature in features" :key="feature" class="flex items-start gap-2">
          <Check class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{{ feature }}</span>
        </li>
      </ul>
      <Button
        type="button"
        :variant="highlighted ? 'default' : 'outline'"
        class="w-full"
        @click="emit('select')"
      >
        {{ ctaLabel }}
      </Button>
    </CardContent>
  </Card>
</template>
