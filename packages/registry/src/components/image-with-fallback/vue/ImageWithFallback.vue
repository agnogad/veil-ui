<script setup lang="ts">
import { ImageOff } from "lucide-vue-next";
import { ref } from "vue";

import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  src?: string;
  alt?: string;
  wrapperClassName?: string;
  class?: string;
}>();

const failed = ref(false);
</script>

<template>
  <div
    v-if="failed"
    data-slot="image-fallback"
    :class="
      cn(
        'flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 p-4 text-center text-sm text-muted-foreground',
        props.wrapperClassName,
      )
    "
  >
    <slot name="fallback">
      <ImageOff class="size-5" aria-hidden="true" />
      <span>{{ props.alt || "Image unavailable" }}</span>
    </slot>
  </div>
  <img
    v-else
    data-slot="image"
    :src="props.src"
    :alt="props.alt"
    :class="cn('max-w-full rounded-lg object-cover', props.class)"
    v-bind="$attrs"
    @error="failed = true"
  />
</template>
