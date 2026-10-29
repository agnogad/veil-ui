<script setup lang="ts">
import { Search, X } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    containerClassName?: string;
    modelValue?: string | number;
    /** Alias for `modelValue`, matching the React `value` prop. */
    value?: string | number;
    defaultValue?: string | number;
  }>(),
  { defaultValue: "" },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:value": [value: string];
  clear: [];
}>();

const uncontrolled = ref(String(props.defaultValue ?? ""));

const isControlled = computed(
  () => props.modelValue !== undefined || props.value !== undefined,
);

const current = computed(() =>
  String(
    isControlled.value
      ? (props.value ?? props.modelValue ?? "")
      : uncontrolled.value,
  ),
);

function setValue(next: string) {
  if (!isControlled.value) uncontrolled.value = next;
  emit("update:modelValue", next);
  emit("update:value", next);
}

function clear() {
  setValue("");
  emit("clear");
}
</script>

<template>
  <div
    data-slot="search-input"
    :class="cn('relative w-full', props.containerClassName)"
  >
    <Search
      aria-hidden="true"
      class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
    />
    <Input
      v-bind="$attrs"
      type="search"
      :model-value="current"
      :class="
        cn(
          'pl-9 pr-9 [&::-webkit-search-cancel-button]:appearance-none',
          props.class,
        )
      "
      @update:model-value="setValue"
    />
    <button
      v-if="current"
      type="button"
      aria-label="Clear search"
      class="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      @click="clear"
    >
      <X class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
