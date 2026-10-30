<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type { ButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    class?: string;
  }>(),
  { variant: "outline", type: "button" },
);
</script>

<template>
  <Button
    data-slot="social-button"
    :variant="variant"
    :size="size"
    :type="type"
    :disabled="disabled"
    :class="cn('w-full gap-2', props.class)"
  >
    <span
      v-if="$slots.icon"
      data-slot="social-button-icon"
      class="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4"
    >
      <slot name="icon" />
    </span>
    <slot />
  </Button>
</template>
