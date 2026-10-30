<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  label?: string;
  class?: string;
}>();
</script>

<template>
  <Card class="overflow-hidden py-0">
    <ul
      data-slot="list-view"
      :aria-label="label"
      :class="cn('divide-y', props.class)"
    >
      <slot />
    </ul>
  </Card>
</template>
