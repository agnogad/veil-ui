<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { BlockquoteProps } from "./types";

const props = defineProps<BlockquoteProps>();
</script>

<template>
  <blockquote
    data-slot="blockquote"
    :cite="props.cite"
    :class="
      cn(
        'border-l-2 pl-4 text-sm italic text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
    <footer v-if="props.cite" class="mt-2 text-xs not-italic">
      <span aria-hidden="true">— </span>
      <cite>{{ props.cite }}</cite>
    </footer>
  </blockquote>
</template>
