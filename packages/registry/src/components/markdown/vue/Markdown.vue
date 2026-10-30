<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { renderMarkdown } from "./render";

const props = defineProps<{
  children?: string;
  source?: string;
  class?: string;
}>();

const html = computed(() => renderMarkdown(props.children ?? props.source ?? ""));
</script>

<template>
  <div data-slot="markdown" :class="cn('text-sm', props.class)" v-html="html" />
</template>
