<script setup lang="ts">
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
} from "lucide-vue-next";
import { computed } from "vue";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type {
  NotificationCardProps,
  NotificationType,
  NotificationTypeConfig,
} from "./types";

const props = withDefaults(defineProps<NotificationCardProps>(), {
  type: "info",
  unread: false,
});

const typeConfig: Record<NotificationType, NotificationTypeConfig> = {
  info: { icon: Info, classes: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  success: {
    icon: CheckCircle2,
    classes:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: Bell,
    classes: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
};

const config = computed(() => typeConfig[props.type]);
</script>

<template>
  <Card
    data-slot="notification-card"
    :data-unread="unread || undefined"
    :class="
      cn(
        'max-w-md gap-0 py-3',
        unread && 'border-primary/40 bg-primary/5',
        props.class,
      )
    "
  >
    <CardContent class="flex gap-3">
      <span
        :class="
          cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full',
            config.classes,
          )
        "
      >
        <component :is="config.icon" class="size-4" aria-hidden />
      </span>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <p class="text-sm font-medium">
            <slot name="title">{{ title }}</slot>
          </p>
          <span
            v-if="unread"
            class="mt-1 size-2 shrink-0 rounded-full bg-primary"
            aria-label="Unread"
          />
        </div>
        <p
          v-if="description || $slots.description"
          class="mt-1 text-sm text-muted-foreground"
        >
          <slot name="description">{{ description }}</slot>
        </p>
        <div class="mt-1 flex items-center gap-3">
          <time
            v-if="time || $slots.time"
            class="text-xs text-muted-foreground"
          >
            <slot name="time">{{ time }}</slot>
          </time>
          <slot name="actions" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
