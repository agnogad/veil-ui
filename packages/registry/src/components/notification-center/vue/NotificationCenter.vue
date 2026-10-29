<script setup lang="ts">
import { Bell } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Notification } from "@/components/ui/notification";

import type {
  NotificationCenterItem,
  NotificationCenterProps,
} from "./types";

const props = withDefaults(defineProps<NotificationCenterProps>(), {
  title: "Notifications",
  triggerLabel: "Notifications",
  emptyLabel: "You're all caught up.",
});

const emit = defineEmits<{
  markAllRead: [];
  dismiss: [id: string];
}>();

const items = ref<NotificationCenterItem[]>([]);

watch(
  () => props.notifications,
  (value) => {
    items.value = value.map((item) => ({ ...item }));
  },
  { immediate: true, deep: true },
);

const unreadCount = computed(
  () => items.value.filter((item) => item.unread).length,
);
const accessibleName = computed(() =>
  unreadCount.value > 0
    ? `${props.triggerLabel} (${unreadCount.value} unread)`
    : props.triggerLabel,
);

function markAllRead() {
  items.value = items.value.map((item) => ({ ...item, unread: false }));
  emit("markAllRead");
}

function dismiss(id: string) {
  items.value = items.value.filter((item) => item.id !== id);
  emit("dismiss", id);
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button
        type="button"
        :aria-label="accessibleName"
        class="relative inline-flex size-9 shrink-0 items-center justify-center rounded-md outline-none transition-[color,background-color,border-color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <Bell />
        <span
          v-if="unreadCount > 0"
          aria-hidden
          class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
        >
          {{ unreadCount }}
        </span>
      </button>
    </PopoverTrigger>
    <PopoverContent
      data-slot="notification-center"
      :aria-label="title"
      align="end"
      :side-offset="8"
      :class="
        cn(
          'z-50 grid w-80 gap-3 rounded-lg border bg-popover p-3 text-popover-foreground shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 origin-[var(--reka-popper-transform-origin)]',
          props.class,
        )
      "
    >
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm font-semibold">{{ title }}</p>
        <Button
          v-if="unreadCount > 0"
          variant="ghost"
          size="sm"
          @click="markAllRead"
        >
          Mark all read
        </Button>
      </div>
      <p
        v-if="items.length === 0"
        class="py-6 text-center text-sm text-muted-foreground"
      >
        {{ emptyLabel }}
      </p>
      <div v-else class="grid max-h-80 gap-2 overflow-y-auto">
        <Notification
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :description="item.description"
          :timestamp="item.timestamp"
          :unread="item.unread"
          :icon="item.icon"
          @dismiss="dismiss(item.id)"
        />
      </div>
    </PopoverContent>
  </Popover>
</template>
