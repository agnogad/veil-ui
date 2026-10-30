<script setup lang="ts">
import { computed, ref } from "vue";

import { cn } from "@/lib/utils";

import { defaultIcons, type IconPickerItem } from "./icons";

const props = defineProps<{
  icons?: IconPickerItem[];
  value?: string;
  class?: string;
}>();

const emit = defineEmits<{
  select: [item: IconPickerItem];
  "update:value": [value: string];
}>();

function choose(item: IconPickerItem) {
  emit("select", item);
  emit("update:value", item.name);
}

const query = ref("");

const filtered = computed(() => {
  const options = props.icons ?? defaultIcons;
  const term = query.value.trim().toLowerCase();
  if (!term) return options;
  return options.filter((item) => item.name.toLowerCase().includes(term));
});
</script>

<template>
  <div data-slot="icon-picker" :class="cn('grid gap-2', props.class)">
    <input
      v-model="query"
      type="search"
      placeholder="Search icons"
      aria-label="Search icons"
      class="h-8 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
    <div class="grid grid-cols-7 gap-1">
      <p
        v-if="filtered.length === 0"
        class="col-span-full py-4 text-center text-xs text-muted-foreground"
      >
        No icons found.
      </p>
      <template v-else>
        <button
          v-for="item in filtered"
          :key="item.name"
          type="button"
          :aria-label="item.name"
          :aria-pressed="value === item.name"
          :class="
            cn(
              'flex items-center justify-center rounded-md border border-transparent p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              value === item.name && 'border-border bg-accent text-accent-foreground',
            )
          "
          @click="choose(item)"
        >
          <component :is="item.icon" class="size-4" aria-hidden="true" />
        </button>
      </template>
    </div>
  </div>
</template>
