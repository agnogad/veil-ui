<script setup lang="ts">
import { Download } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import type { ButtonVariants } from "@/components/ui/button";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    download?: string;
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: string;
  }>(),
  { label: "Download" },
);
</script>

<template>
  <Button
    as-child
    :variant="variant"
    :size="size"
    data-slot="download-button"
    :class="props.class"
  >
    <a v-bind="$attrs" :download="download ?? ''">
      <Download aria-hidden="true" />
      <slot>{{ label }}</slot>
    </a>
  </Button>
</template>
