<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useCarousel } from "./use-carousel";

const props = defineProps<{ class?: string }>();
const { scrollNext, canNext } = useCarousel();
</script>

<template>
  <Button
    type="button"
    variant="outline"
    size="icon"
    :disabled="!canNext"
    aria-label="Next slide"
    :class="
      cn(
        'absolute right-2 top-1/2 size-8 -translate-y-1/2 rounded-full',
        props.class,
      )
    "
    @click="scrollNext"
  >
    <ArrowRight class="size-4" aria-hidden="true" />
  </Button>
</template>
