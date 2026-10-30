<script setup lang="ts">
import { Clock, Search, X } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    suggestions?: string[];
    defaultValue?: string;
    class?: string;
  }>(),
  { placeholder: "Search", suggestions: () => [], defaultValue: "" },
);

const emit = defineEmits<{ search: [query: string]; clear: [] }>();

const query = defineModel<string>("modelValue", { default: "" });

if (props.defaultValue && !query.value) query.value = props.defaultValue;

function submit() {
  emit("search", query.value);
}

function clear() {
  query.value = "";
  emit("clear");
}
</script>

<template>
  <div data-slot="mobile-search" :class="cn('w-full max-w-sm', props.class)">
    <form
      role="search"
      class="flex items-center gap-2 rounded-full border bg-muted/40 px-3 focus-within:ring-[3px] focus-within:ring-ring/30"
      @submit.prevent="submit"
    >
      <Search class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <input
        v-model="query"
        type="search"
        :placeholder="placeholder"
        :aria-label="placeholder"
        class="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        v-if="query"
        type="button"
        aria-label="Clear search"
        class="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        @click="clear"
      >
        <X class="size-4" aria-hidden="true" />
      </button>
    </form>
    <ul v-if="suggestions.length > 0" class="mt-3 grid gap-1" aria-label="Recent searches">
      <li v-for="suggestion in suggestions" :key="suggestion">
        <button
          type="button"
          class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="query = suggestion; submit()"
        >
          <Clock class="size-3.5" aria-hidden="true" />
          {{ suggestion }}
        </button>
      </li>
    </ul>
  </div>
</template>
