<script setup lang="ts">
import { Music } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{
  src: string;
  title?: string;
  artist?: string;
  audioClassName?: string;
  class?: string;
}>();
</script>

<template>
  <figure
    data-slot="audio-player"
    :class="
      cn(
        'flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-4',
        props.class,
      )
    "
  >
    <div class="flex items-center gap-3">
      <span class="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Music class="size-4" aria-hidden="true" />
      </span>
      <div class="min-w-0 text-sm">
        <p class="truncate font-medium">{{ title ?? "Audio track" }}</p>
        <p v-if="artist" class="truncate text-xs text-muted-foreground">{{ artist }}</p>
      </div>
    </div>
    <audio
      :src="src"
      controls
      preload="metadata"
      :aria-label="title ?? 'Audio track'"
      :class="cn('w-full', audioClassName)"
    />
  </figure>
</template>
