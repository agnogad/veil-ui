<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Show a spinner and disable the button. */
    loading?: boolean;
    /** Screen-reader text while loading. */
    loadingLabel?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { loading: false, loadingLabel: "Loading" },
);
</script>

<template>
  <Button
    data-slot="loading-button"
    :aria-busy="loading"
    :disabled="disabled || loading"
    v-bind="$attrs"
    :class="props.class"
  >
    <Spinner v-if="loading" size="sm" :label="loadingLabel" />
    <slot />
  </Button>
</template>
