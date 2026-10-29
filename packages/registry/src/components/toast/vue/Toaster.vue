<script setup lang="ts">
import { X } from "lucide-vue-next";
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "reka-ui";
import { computed } from "vue";

import { cn } from "@/lib/utils";

import { toastVariants } from "./variants";
import { useOptionalToast } from "./use-toast";

const props = defineProps<{ class?: string }>();

const store = useOptionalToast();
const toasts = computed(() => store?.toasts.value ?? []);

function dismiss(id: string) {
  store?.dismiss(id);
}
</script>

<template>
  <ToastViewport
    data-slot="toaster"
    :class="
      cn(
        'fixed right-0 bottom-0 z-50 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm',
        props.class,
      )
    "
  >
    <ToastRoot
      v-for="item in toasts"
      :key="item.id"
      data-slot="toast"
      :data-variant="item.variant ?? 'default'"
      :duration="item.duration"
      :class="cn(toastVariants({ variant: item.variant }))"
      @update:open="
        (open) => {
          if (!open) dismiss(item.id);
        }
      "
    >
      <div class="grid flex-1 gap-1">
        <ToastTitle class="font-medium">{{ item.title }}</ToastTitle>
        <ToastDescription
          v-if="item.description"
          data-slot="toast-description"
          class="opacity-90"
        >
          {{ item.description }}
        </ToastDescription>
        <ToastAction
          v-if="item.action"
          :alt-text="item.action.altText ?? item.action.label"
          class="mt-2 inline-flex h-8 w-fit items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
          @click="item.action.onClick?.()"
        >
          {{ item.action.label }}
        </ToastAction>
        <div v-if="$slots.action" class="mt-2">
          <slot name="action" :toast="item" />
        </div>
      </div>
      <ToastClose as-child>
        <button
          type="button"
          aria-label="Dismiss notification"
          class="absolute top-2 right-2 inline-flex size-8 shrink-0 items-center justify-center rounded-md outline-none transition-[color,background-color,border-color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <X />
        </button>
      </ToastClose>
    </ToastRoot>
  </ToastViewport>
</template>
