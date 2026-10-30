<script setup lang="ts">
import { FileText, X } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{
  name: string;
  size?: string;
  url?: string;
  class?: string;
}>();

const emit = defineEmits<{ remove: [] }>();
</script>

<template>
  <div
    data-slot="attachment"
    :class="
      cn(
        'inline-flex max-w-xs items-center gap-2 rounded-md border bg-card px-2.5 py-1.5 text-xs',
        props.class,
      )
    "
  >
    <FileText class="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
    <a v-if="url" :href="url" class="truncate font-medium hover:underline">{{ name }}</a>
    <span v-else class="truncate font-medium">{{ name }}</span>
    <span v-if="size" class="shrink-0 text-muted-foreground">{{ size }}</span>
    <button
      v-if="$slots.remove"
      type="button"
      :aria-label="`Remove ${name}`"
      class="ml-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      @click="emit('remove')"
    >
      <X class="size-3" aria-hidden="true" />
    </button>
  </div>
</template>
