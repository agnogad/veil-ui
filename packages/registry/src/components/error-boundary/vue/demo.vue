<script setup lang="ts">
import { defineComponent, h, ref } from "vue";

import { Button } from "@/components/ui/button";

import { ErrorBoundary } from "./index";

const Bomb = defineComponent({
  name: "Bomb",
  props: {
    explode: { type: Boolean, default: false },
  },
  emits: ["explode"],
  setup(props, { emit }) {
    return () => {
      if (props.explode) {
        throw new Error("The demo could not render this widget.");
      }

      return h(
        Button,
        { variant: "outline", onClick: () => emit("explode") },
        () => "Trigger an error",
      );
    };
  },
});

const explode = ref(false);
const errors = ref(0);

function handleError() {
  errors.value += 1;
}

function restoreWidget(reset: () => void) {
  explode.value = false;
  reset();
}
</script>

<template>
  <div class="grid max-w-md gap-3">
    <ErrorBoundary :on-error="handleError">
      <template #fallback="{ error, reset }">
        <div class="flex flex-col items-start gap-2 rounded-lg border p-4">
          <p class="text-sm font-medium">Widget unavailable</p>
          <p class="text-sm text-muted-foreground">{{ error.message }}</p>
          <Button size="sm" @click="restoreWidget(reset)">
            Restore widget
          </Button>
        </div>
      </template>
      <Bomb :explode="explode" @explode="explode = true" />
    </ErrorBoundary>
    <p class="text-xs text-muted-foreground">
      Errors captured: {{ errors }}
    </p>
  </div>
</template>
