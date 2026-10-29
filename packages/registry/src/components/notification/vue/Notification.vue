<script setup lang="ts">
import { X } from "lucide-vue-next";
import { computed, getCurrentInstance } from "vue";

import { cn } from "@/lib/utils";

import type { NotificationProps } from "./types";

const props = withDefaults(defineProps<NotificationProps>(), {
  unread: false,
  dismissible: false,
  dismissLabel: "Dismiss notification",
});

const emit = defineEmits<{ dismiss: [] }>();

const instance = getCurrentInstance();
const hasDismissListener = computed(() =>
  Boolean(instance?.vnode.props?.onDismiss),
);
const showDismiss = computed(
  () => props.dismissible || hasDismissListener.value,
);
</script>

<template>
  <div
    data-slot="notification"
    :data-unread="unread || undefined"
    :class="
      cn(
        'relative flex w-full items-start gap-3 rounded-lg border bg-card p-3 text-sm shadow-xs',
        unread && 'border-primary/30 bg-primary/5',
        props.class,
      )
    "
  >
    <div
      v-if="icon || $slots.icon"
      aria-hidden
      class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
    >
      <slot name="icon">
        <component :is="icon" class="size-4" />
      </slot>
    </div>
    <div class="grid min-w-0 flex-1 gap-0.5">
      <div class="flex items-center gap-2">
        <p class="truncate font-medium">
          <slot name="title">{{ title }}</slot>
        </p>
        <span v-if="unread" class="sr-only">Unread</span>
      </div>
      <p v-if="description || $slots.description" class="text-muted-foreground">
        <slot name="description">{{ description }}</slot>
      </p>
      <span
        v-if="timestamp || $slots.timestamp"
        class="text-xs text-muted-foreground"
      >
        <slot name="timestamp">{{ timestamp }}</slot>
      </span>
      <div v-if="$slots.action" class="mt-2">
        <slot name="action" />
      </div>
    </div>
    <button
      v-if="showDismiss"
      type="button"
      :aria-label="dismissLabel"
      class="-mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md outline-none transition-[color,background-color,border-color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      @click="emit('dismiss')"
    >
      <X />
    </button>
    <span
      v-if="unread"
      aria-hidden
      class="absolute top-3 right-3 size-1.5 rounded-full bg-primary"
    />
  </div>
</template>
