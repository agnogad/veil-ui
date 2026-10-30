<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useCarousel } from "./use-carousel";

const props = defineProps<{ class?: string }>();
const { scrollPrev, canPrev } = useCarousel();
</script>

<template>
  <Button
    type="button"
    variant="outline"
    size="icon"
    :disabled="!canPrev"
    aria-label="Previous slide"
    :class="
      cn(
        'absolute left-2 top-1/2 size-8 -translate-y-1/2 rounded-full',
        props.class,
      )
    "
    @click="scrollPrev"
  >
    <ArrowLeft class="size-4" aria-hidden="true" />
  </Button>
</template>
