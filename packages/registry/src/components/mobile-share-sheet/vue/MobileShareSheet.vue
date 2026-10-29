<script setup lang="ts">
import { Check, Link2, Mail, MessageCircle, Send } from "lucide-vue-next";
import { ref, watch } from "vue";

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
} from "@/components/ui/bottom-sheet";
import { cn } from "@/lib/utils";

import type { MobileShareTarget } from "./types";

const defaultTargets: MobileShareTarget[] = [
  { label: "Email", icon: Mail, href: "mailto:?subject=Shared%20link" },
  { label: "Message", icon: MessageCircle, href: "#" },
  { label: "Send", icon: Send, href: "#" },
  { label: "Copy link", icon: Link2 },
];

const props = withDefaults(
  defineProps<{
    open: boolean;
    url: string;
    title?: string;
    targets?: MobileShareTarget[];
    class?: string;
  }>(),
  { title: "Share", targets: () => defaultTargets },
);

const emit = defineEmits<{ "update:open": [value: boolean] }>();

const copied = ref(false);

watch(
  () => props.open,
  (open) => {
    if (open) copied.value = false;
  },
);

function isCopy(target: MobileShareTarget) {
  return target.label.toLowerCase().includes("copy");
}

async function copy(target: MobileShareTarget) {
  try {
    await navigator.clipboard?.writeText(props.url);
    copied.value = true;
  } catch {
    copied.value = false;
  }
  target.onClick?.();
}

function activate(target: MobileShareTarget) {
  target.onClick?.();
  emit("update:open", false);
}

const targetClass = cn(
  "flex w-full flex-col items-center gap-1.5 rounded-lg py-2 text-center outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
);
</script>

<template>
  <BottomSheet
    :open="props.open"
    @update:open="emit('update:open', $event)"
  >
    <BottomSheetContent :class="props.class">
      <BottomSheetHeader>
        <BottomSheetTitle>{{ props.title }}</BottomSheetTitle>
        <BottomSheetDescription class="truncate">
          {{ props.url }}
        </BottomSheetDescription>
      </BottomSheetHeader>

      <ul class="grid grid-cols-4 gap-3" aria-label="Share targets">
        <li v-for="target in props.targets" :key="target.label">
          <button
            v-if="isCopy(target)"
            type="button"
            :class="targetClass"
            @click="copy(target)"
          >
            <span
              class="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5"
            >
              <Check
                v-if="copied"
                class="size-5 text-primary"
                aria-hidden="true"
              />
              <component :is="target.icon ?? Link2" v-else aria-hidden="true" />
            </span>
            <span class="text-[11px] leading-tight">
              {{ copied ? "Copied" : target.label }}
            </span>
          </button>

          <a
            v-else-if="target.href"
            :href="target.href"
            :class="targetClass"
            @click="activate(target)"
          >
            <span
              class="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5"
            >
              <component :is="target.icon ?? Link2" aria-hidden="true" />
            </span>
            <span class="text-[11px] leading-tight">{{ target.label }}</span>
          </a>

          <button
            v-else
            type="button"
            :class="targetClass"
            @click="activate(target)"
          >
            <span
              class="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5"
            >
              <component :is="target.icon ?? Link2" aria-hidden="true" />
            </span>
            <span class="text-[11px] leading-tight">{{ target.label }}</span>
          </button>
        </li>
      </ul>
    </BottomSheetContent>
  </BottomSheet>
</template>
