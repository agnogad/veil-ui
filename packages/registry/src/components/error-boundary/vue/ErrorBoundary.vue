<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";
import { onErrorCaptured, ref } from "vue";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ErrorBoundaryProps, ErrorFallbackProps } from "./types";

defineOptions({ name: "ErrorBoundary" });

defineSlots<{
  default?: () => unknown;
  fallback?: (props: ErrorFallbackProps) => unknown;
}>();

const props = defineProps<ErrorBoundaryProps>();

const error = ref<Error | null>(null);

onErrorCaptured((captured, _instance, info) => {
  const normalized =
    captured instanceof Error ? captured : new Error(String(captured));
  error.value = normalized;
  props.onError?.(normalized, info);
  return false;
});

function reset() {
  error.value = null;
}
</script>

<template>
  <template v-if="!error">
    <slot />
  </template>
  <slot
    v-else
    name="fallback"
    :error="error ?? new Error('Unknown error')"
    :reset="reset"
  >
    <div
      data-slot="error-boundary"
      role="alert"
      :class="
        cn(
          'flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-12 text-center',
          props.class,
        )
      "
    >
      <div
        aria-hidden
        class="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive"
      >
        <AlertTriangle class="size-5" />
      </div>
      <div class="grid gap-1">
        <p class="text-sm font-medium text-foreground">Something went wrong</p>
        <p class="text-sm text-muted-foreground">{{ error?.message }}</p>
      </div>
      <Button variant="outline" size="sm" @click="reset">Try again</Button>
    </div>
  </slot>
</template>
