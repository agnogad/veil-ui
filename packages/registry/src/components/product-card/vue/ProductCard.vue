<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { computed } from "vue";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    badge?: string;
    currency?: string;
    class?: string;
  }>(),
  { currency: "USD" },
);

const emit = defineEmits<{ addToCart: [] }>();

const discounted = computed(
  () => props.originalPrice !== undefined && props.originalPrice > props.price,
);

function formatPrice(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: props.currency,
  }).format(value);
}
</script>

<template>
  <Card
    data-slot="product-card"
    :class="cn('group max-w-xs overflow-hidden py-0', props.class)"
  >
    <div class="relative">
      <img
        :src="src"
        :alt="alt"
        loading="lazy"
        class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span
        v-if="badge"
        class="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground"
      >
        {{ badge }}
      </span>
    </div>
    <CardHeader class="pt-4">
      <CardTitle class="text-sm">{{ name }}</CardTitle>
      <div
        v-if="rating !== undefined"
        class="flex items-center gap-1 text-xs text-muted-foreground"
      >
        <Star class="size-3.5 fill-current text-amber-500" aria-hidden="true" />
        <span>{{ rating.toFixed(1) }}</span>
        <span v-if="reviewCount !== undefined">({{ reviewCount }})</span>
      </div>
    </CardHeader>
    <CardContent class="flex items-center justify-between gap-3 pb-4">
      <p class="flex items-baseline gap-2">
        <span class="text-base font-semibold">{{ formatPrice(price) }}</span>
        <span v-if="discounted" class="text-xs text-muted-foreground line-through">
          {{ formatPrice(originalPrice!) }}
        </span>
      </p>
      <Button type="button" size="sm" @click="emit('addToCart')">
        Add to cart
      </Button>
    </CardContent>
  </Card>
</template>
