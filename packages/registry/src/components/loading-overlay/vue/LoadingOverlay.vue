<script setup lang="ts">
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    visible?: boolean;
    label?: string;
    fullscreen?: boolean;
  }>(),
  { visible: true, label: "Loading", fullscreen: false },
);
</script>

<template>
  <div
    v-if="props.visible"
    data-slot="loading-overlay"
    aria-busy="true"
    :class="
      cn(
        'flex items-center justify-center bg-background/80 backdrop-blur-sm',
        props.fullscreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10',
        props.class,
      )
    "
  >
    <div class="flex flex-col items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="lg" :label="props.label" />
      <span aria-hidden="true">{{ props.label }}</span>
    </div>
  </div>
</template>
