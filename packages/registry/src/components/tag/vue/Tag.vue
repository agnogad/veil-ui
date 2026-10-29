<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

const props = withDefaults(
  defineProps<{
    variant?:
      | "default"
      | "secondary"
      | "outline"
      | "muted"
      | "destructive";
    asChild?: boolean;
    class?: string;
  }>(),
  { asChild: false },
);
</script>

<template>
  <Badge
    :variant="props.variant"
    :as-child="props.asChild"
    :class="props.class"
  >
    <slot />
  </Badge>
</template>
