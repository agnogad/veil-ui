<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  src: string;
  alt: string;
  title: string;
  description?: string;
  imageClassName?: string;
  class?: string;
}>();
</script>

<template>
  <Card
    data-slot="image-card"
    :class="cn('overflow-hidden py-0', props.class)"
  >
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      :class="cn('aspect-video w-full object-cover', imageClassName)"
    />
    <CardHeader class="pt-5">
      <CardTitle>
        <slot name="title">{{ title }}</slot>
      </CardTitle>
      <CardDescription v-if="description || $slots.description">
        <slot name="description">{{ description }}</slot>
      </CardDescription>
    </CardHeader>
    <CardContent v-if="$slots.default">
      <slot />
    </CardContent>
    <div
      v-if="$slots.footer"
      class="flex items-center border-t px-5 py-3 text-sm text-muted-foreground"
    >
      <slot name="footer" />
    </div>
  </Card>
</template>
