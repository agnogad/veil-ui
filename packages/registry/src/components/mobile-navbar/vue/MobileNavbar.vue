<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import { Menu, X } from "lucide-vue-next";
import { ref } from "vue";

import { cn } from "@/lib/utils";

import type { MobileNavbarProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<MobileNavbarProps>();

const open = ref(false);
</script>

<template>
  <header
    data-slot="mobile-navbar"
    v-bind="$attrs"
    :class="
      cn(
        'flex h-14 w-full items-center gap-3 border-b bg-background/95 px-4 backdrop-blur',
        props.class,
      )
    "
  >
    <DialogRoot v-model:open="open">
      <DialogTrigger as-child>
        <button
          type="button"
          aria-label="Open menu"
          class="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu class="size-5" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay
          class="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />
        <DialogContent
          class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background p-4 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out [--veil-animation-duration:300ms] [--veil-exit-duration:200ms] data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full"
        >
          <div class="mb-4 flex items-center justify-between">
            <DialogTitle class="text-sm font-semibold">
              <slot name="title">{{ title }}</slot>
            </DialogTitle>
            <DialogClose as-child>
              <button
                type="button"
                aria-label="Close menu"
                class="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X class="size-4" aria-hidden="true" />
              </button>
            </DialogClose>
          </div>
          <nav aria-label="Mobile" class="grid gap-1">
            <a
              v-for="link in links"
              :key="link.href"
              :href="link.href"
              :aria-current="link.active ? 'page' : undefined"
              :class="
                cn(
                  'rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                  link.active && 'bg-accent font-medium text-accent-foreground',
                )
              "
              @click="open = false"
            >
              {{ link.label }}
            </a>
          </nav>
          <div v-if="$slots.actions" class="mt-auto border-t pt-4">
            <slot name="actions" />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
    <span class="flex-1 truncate text-sm font-semibold">
      <slot name="title">{{ title }}</slot>
    </span>
    <div v-if="$slots.actions" class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
