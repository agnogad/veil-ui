<script setup lang="ts">
import { RichText } from "@/components/ui/rich-text";
import type { RichTextProps } from "@/components/ui/rich-text";

defineProps<RichTextProps & { class?: string }>();
</script>

<template>
  <RichText v-bind="$props">
    <slot />
  </RichText>
</template>
