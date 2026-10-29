<script setup lang="ts">
import { AvatarImage } from "reka-ui";

import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: string;
  src: string;
  alt?: string;
}>();
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    :src="props.src"
    :alt="props.alt"
    :class="cn('aspect-square size-full object-cover', props.class)"
  />
</template>
