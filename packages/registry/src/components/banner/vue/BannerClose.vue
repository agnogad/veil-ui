<script setup lang="ts">
import { X } from "lucide-vue-next";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    label?: string;
    class?: string;
  }>(),
  { label: "Dismiss banner" },
);
</script>

<template>
  <IconButton
    data-slot="banner-close"
    variant="ghost"
    size="sm"
    :aria-label="label"
    :class="cn('-mr-1 -mt-1', props.class)"
  >
    <X />
  </IconButton>
</template>
