<script setup lang="ts">
import { computed } from "vue";
import { Quote, Star } from "lucide-vue-next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
  rating?: number;
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
  <Card data-slot="testimonial-card" :class="cn('max-w-md gap-3', props.class)">
    <CardContent class="space-y-4">
      <Quote class="size-6 text-primary/40" aria-hidden="true" />
      <div
        v-if="rating !== undefined"
        class="flex items-center gap-0.5"
        role="img"
        :aria-label="`${rating} out of 5 stars`"
      >
        <Star
          v-for="index in 5"
          :key="index"
          :class="
            cn(
              'size-3.5',
              index <= rating
                ? 'fill-amber-500 text-amber-500'
                : 'text-muted-foreground/40',
            )
          "
          aria-hidden="true"
        />
      </div>
      <blockquote class="text-sm leading-relaxed">
        <slot name="quote">{{ quote }}</slot>
      </blockquote>
    </CardContent>
    <CardFooter class="gap-3">
      <Avatar size="sm">
        <AvatarImage v-if="avatarSrc" :src="avatarSrc" alt="" />
        <AvatarFallback>{{ fallback }}</AvatarFallback>
      </Avatar>
      <figcaption class="text-sm">
        <span class="font-medium">{{ name }}</span>
        <span v-if="role" class="text-muted-foreground"> · {{ role }}</span>
      </figcaption>
    </CardFooter>
  </Card>
</template>
