<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { BackButtonProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BackButtonProps>(), {
  label: "Back",
  showIcon: true,
  variant: "ghost",
  size: "sm",
});

function handleClick() {
  if (props.onClick) {
    props.onClick();
    return;
  }
  if (props.fallbackHref) {
    window.location.href = props.fallbackHref;
    return;
  }
  window.history.back();
}
</script>

<template>
  <Button
    data-slot="back-button"
    type="button"
    :variant="variant"
    :size="size"
    :class="cn('gap-1.5', props.class)"
    @click="handleClick"
    v-bind="$attrs"
  >
    <ArrowLeft v-if="showIcon" aria-hidden="true" />
    {{ label }}
  </Button>
</template>
