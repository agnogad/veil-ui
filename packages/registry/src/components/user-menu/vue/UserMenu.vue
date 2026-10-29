<script setup lang="ts">
import { ChevronDown, LogOut, Settings, User } from "lucide-vue-next";
import { DropdownMenuItem as RekaDropdownMenuItem } from "reka-ui";
import { computed, getCurrentInstance } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { UserMenuItem } from "./types";

const props = withDefaults(
  defineProps<{
    name: string;
    email: string;
    avatarSrc?: string;
    items?: UserMenuItem[];
    onSignOut?: () => void;
    class?: string;
  }>(),
  {
    items: () => [
      { label: "Profile", href: "#profile", icon: User },
      { label: "Settings", href: "#settings", icon: Settings },
    ],
  },
);

const emit = defineEmits<{ "sign-out": [] }>();

const linkItemClasses =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const instance = getCurrentInstance();
const showSignOut = computed(
  () =>
    Boolean(props.onSignOut) ||
    Boolean(instance?.vnode.props?.onSignOut),
);

const fallback = computed(() =>
  props.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
);

function handleSignOut() {
  props.onSignOut?.();
  emit("sign-out");
}
</script>

<template>
  <div
    data-slot="user-menu"
    :class="cn('inline-flex', props.class)"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <button
          type="button"
          :aria-label="`Open menu for ${name}`"
          class="inline-flex items-center gap-2 rounded-full border bg-background p-1 pr-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar size="sm">
            <AvatarImage v-if="avatarSrc" :src="avatarSrc" alt="" />
            <AvatarFallback>{{ fallback }}</AvatarFallback>
          </Avatar>
          <span class="hidden max-w-32 truncate sm:block">{{ name }}</span>
          <ChevronDown
            class="size-3.5 text-muted-foreground"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-56">
        <DropdownMenuLabel class="font-normal">
          <p class="truncate text-sm font-medium">{{ name }}</p>
          <p class="truncate text-xs text-muted-foreground">{{ email }}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <template v-for="item in props.items" :key="item.label">
          <RekaDropdownMenuItem
            v-if="item.href"
            as-child
            :class="cn(linkItemClasses, '[&_svg]:size-4')"
          >
            <a :href="item.href">
              <component :is="item.icon" v-if="item.icon" aria-hidden="true" />
              {{ item.label }}
            </a>
          </RekaDropdownMenuItem>
          <DropdownMenuItem
            v-else
            class="[&_svg]:size-4"
            @select="item.onSelect?.()"
          >
            <component :is="item.icon" v-if="item.icon" aria-hidden="true" />
            {{ item.label }}
          </DropdownMenuItem>
        </template>
        <template v-if="showSignOut">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            class="text-destructive focus:text-destructive"
            @select="handleSignOut"
          >
            <LogOut class="size-4" aria-hidden="true" />
            Sign out
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
