<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { emojis as defaultEmojis, type Emoji } from "./emojis";

const props = withDefaults(
  defineProps<{
    emojis?: Emoji[];
    label?: string;
    class?: string;
  }>(),
  { label: "Emoji picker" },
);

const emit = defineEmits<{ select: [emoji: string] }>();

const query = defineModel<string>("query", { default: "" });

const filtered = computed(() => {
  const options = props.emojis ?? defaultEmojis;
  const term = query.value.trim().toLowerCase();
  if (!term) return options;
  return options.filter((item) => item.name.includes(term));
});
</script>

<template>
  <div
    data-slot="emoji-picker"
    :class="cn('w-full max-w-sm rounded-lg border bg-card p-3 shadow-xs', props.class)"
  >
    <div class="relative mb-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <Input
        v-model="query"
        placeholder="Search emoji"
        :aria-label="`${label}, search`"
        class="pl-8"
      />
    </div>
    <p v-if="filtered.length === 0" class="py-6 text-center text-sm text-muted-foreground">
      No emoji found.
    </p>
    <ul
      v-else
      :aria-label="label"
      class="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto"
    >
      <li v-for="item in filtered" :key="item.emoji">
        <button
          type="button"
          :aria-label="item.name"
          :title="item.name"
          class="flex size-8 items-center justify-center rounded-md text-lg outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          @click="emit('select', item.emoji)"
        >
          {{ item.emoji }}
        </button>
      </li>
    </ul>
  </div>
</template>
