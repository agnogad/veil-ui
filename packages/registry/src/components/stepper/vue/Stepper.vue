<script setup lang="ts">
import { Check } from "lucide-vue-next";

import { cn } from "@/lib/utils";

import type { StepperProps } from "./types";

const props = withDefaults(defineProps<StepperProps>(), {
  orientation: "horizontal",
});

function stateFor(index: number) {
  const number = index + 1;
  if (number < props.current) return "completed";
  if (number === props.current) return "current";
  return "upcoming";
}
</script>

<template>
  <ol
    data-slot="stepper"
    :class="
      cn(
        orientation === 'horizontal'
          ? 'flex w-full items-start gap-2'
          : 'grid gap-4',
        props.class,
      )
    "
  >
    <li
      v-for="(step, index) in steps"
      :key="step.title"
      :aria-current="stateFor(index) === 'current' ? 'step' : undefined"
      :data-state="stateFor(index)"
      :class="
        cn(
          'flex gap-3',
          orientation === 'horizontal' && 'flex-1 items-start',
        )
      "
    >
      <span
        :class="
          cn(
            'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
            stateFor(index) === 'completed' &&
              'border-primary bg-primary text-primary-foreground',
            stateFor(index) === 'current' && 'border-foreground text-foreground',
            stateFor(index) === 'upcoming' && 'text-muted-foreground',
          )
        "
      >
        <Check
          v-if="stateFor(index) === 'completed'"
          class="size-3.5"
          aria-hidden="true"
        />
        <template v-else>{{ index + 1 }}</template>
      </span>
      <span class="grid gap-0.5">
        <span
          :class="
            cn(
              'text-sm font-medium',
              stateFor(index) === 'upcoming' && 'text-muted-foreground',
            )
          "
        >
          {{ step.title }}
        </span>
        <span v-if="step.description" class="text-xs text-muted-foreground">
          {{ step.description }}
        </span>
      </span>
      <span
        v-if="orientation === 'horizontal' && index < steps.length - 1"
        aria-hidden="true"
        class="mt-3.5 hidden h-px flex-1 bg-border sm:block"
      />
    </li>
  </ol>
</template>
