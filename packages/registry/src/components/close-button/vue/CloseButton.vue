<script setup lang="ts">
import { X } from "lucide-vue-next";

import { IconButton } from "@/components/ui/icon-button";
import type { IconButtonVariants } from "@/components/ui/icon-button";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    variant?: IconButtonVariants["variant"];
    size?: IconButtonVariants["size"];
    asChild?: boolean;
    class?: string;
  }>(),
  { label: "Close" },
);
</script>

<template>
  <IconButton
    data-slot="close-button"
    :aria-label="label"
    :variant="variant"
    :size="size"
    :as-child="asChild"
    :class="props.class"
    v-bind="$attrs"
  >
    <X aria-hidden="true" />
  </IconButton>
</template>
