<script setup lang="ts">
import { computed } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import type { AvatarGroupUser } from "./types";

const props = withDefaults(
  defineProps<{
    users: AvatarGroupUser[];
    max?: number;
    size?: "sm" | "default" | "lg";
    label?: string;
    class?: string;
  }>(),
  { max: 4, size: "default" },
);

const visible = computed(() => props.users.slice(0, props.max));
const remaining = computed(() => props.users.length - visible.value.length);
const accessibleLabel = computed(
  () =>
    props.label ??
    `Group of ${props.users.length} ${
      props.users.length === 1 ? "person" : "people"
    }`,
);

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
</script>

<template>
  <div
    data-slot="avatar-group"
    role="group"
    :aria-label="accessibleLabel"
    :class="cn('flex items-center -space-x-2', props.class)"
  >
    <Avatar
      v-for="user in visible"
      :key="user.name"
      :size="props.size"
      :title="user.name"
      class="ring-2 ring-background"
    >
      <AvatarImage v-if="user.src" :src="user.src" :alt="user.name" />
      <AvatarFallback>{{ initials(user.name) }}</AvatarFallback>
    </Avatar>
    <span
      v-if="remaining > 0"
      :aria-label="`${remaining} more`"
      :class="
        cn(
          'flex shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background',
          props.size === 'sm'
            ? 'size-6 text-[10px]'
            : props.size === 'lg'
              ? 'size-10 text-sm'
              : 'size-8',
        )
      "
    >
      +{{ remaining }}
    </span>
  </div>
</template>
