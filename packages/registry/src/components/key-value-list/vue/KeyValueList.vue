<script setup lang="ts">
import { Check, Copy } from "lucide-vue-next";
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

import type { KeyValueItem } from "./types";

const props = withDefaults(
  defineProps<{
    items: KeyValueItem[];
    columns?: 1 | 2;
    class?: string;
  }>(),
  { columns: 1 },
);

const copied = ref<string | null>(null);

const entries = computed(() =>
  props.items.map((item, index) => ({
    ...item,
    key: typeof item.label === "string" ? item.label : `item-${index}`,
  })),
);

async function copy(key: string, value?: string) {
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    copied.value = key;
    window.setTimeout(() => {
      copied.value = null;
    }, 1500);
  } catch {
    copied.value = null;
  }
}
</script>

<template>
  <dl
    data-slot="key-value-list"
    :class="
      cn(
        'grid gap-x-6 gap-y-3 text-sm',
        columns === 2 && 'sm:grid-cols-2',
        props.class,
      )
    "
  >
    <div v-for="item in entries" :key="item.key" class="flex flex-col gap-0.5">
      <dt class="text-muted-foreground">{{ item.label }}</dt>
      <dd class="flex items-center gap-2 font-medium">
        <span>{{ item.value }}</span>
        <button
          v-if="item.copyValue"
          type="button"
          :aria-label="`Copy ${item.key}`"
          class="inline-flex size-6 items-center justify-center rounded text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          @click="copy(item.key, item.copyValue)"
        >
          <Check v-if="copied === item.key" class="size-3.5" aria-hidden="true" />
          <Copy v-else class="size-3.5" aria-hidden="true" />
        </button>
      </dd>
    </div>
  </dl>
</template>
