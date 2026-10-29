<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { DescriptionListProps } from "./types";

const props = withDefaults(defineProps<DescriptionListProps>(), {
  layout: "stacked",
});
</script>

<template>
  <dl
    data-slot="description-list"
    :class="
      cn(
        layout === 'inline'
          ? 'grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[minmax(6rem,auto)_1fr]'
          : 'grid gap-4',
        props.class,
      )
    "
  >
    <slot />
  </dl>
</template>
