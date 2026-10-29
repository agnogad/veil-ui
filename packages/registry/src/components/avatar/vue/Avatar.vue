<script setup lang="ts">
import { AvatarRoot } from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { avatarVariants, type AvatarVariants } from "./variants";

const props = defineProps<{
  class?: string;
  size?: AvatarVariants["size"];
}>();

const classes = computed(() =>
  cn(avatarVariants({ size: props.size }), props.class),
);
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size ?? 'default'"
    :class="classes"
  >
    <slot />
  </AvatarRoot>
</template>
