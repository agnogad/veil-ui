<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string; value?: number | null }>();

const offset = computed(() => `translateX(-${100 - (props.value ?? 0)}%)`);
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    :model-value="value ?? 0"
    :class="
      cn('relative h-1.5 w-full overflow-hidden rounded-full bg-primary/15', props.class)
    "
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      class="h-full w-full flex-1 rounded-full bg-primary transition-transform duration-300 motion-reduce:transition-none"
      :style="{ transform: offset }"
    />
  </ProgressRoot>
</template>
