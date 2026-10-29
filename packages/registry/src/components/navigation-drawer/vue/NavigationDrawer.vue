<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import { X } from "lucide-vue-next";
import { computed, useSlots } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    side?: "left" | "right";
    open?: boolean;
    defaultOpen?: boolean;
    class?: string;
  }>(),
  { side: "left" },
);

const emit = defineEmits<{ "update:open": [value: boolean] }>();

const slots = useSlots();

const contentClasses = computed(() =>
  cn(
    "fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col border bg-background p-4 shadow-lg focus:outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out [--veil-animation-duration:300ms] [--veil-exit-duration:200ms]",
    props.side === "left"
      ? "left-0 border-r data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full"
      : "right-0 border-l data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full",
    props.class,
  ),
);
</script>

<template>
  <DialogRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <DialogTrigger v-if="slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <DialogContent
        data-slot="navigation-drawer"
        :data-side="side"
        :class="contentClasses"
      >
        <div class="mb-4 flex items-center justify-between gap-2">
          <DialogTitle class="text-sm font-semibold">
            {{ props.title }}
          </DialogTitle>
          <DialogClose as-child>
            <button
              type="button"
              aria-label="Close drawer"
              class="rounded-sm p-1 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X class="size-4" aria-hidden="true" />
            </button>
          </DialogClose>
        </div>

        <DialogDescription
          v-if="props.description"
          class="mb-4 text-xs text-muted-foreground"
        >
          {{ props.description }}
        </DialogDescription>
        <DialogDescription v-else class="sr-only">
          {{ props.title }} navigation
        </DialogDescription>

        <div class="flex-1 overflow-y-auto">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
