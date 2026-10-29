<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from "@/components/ui/bottom-sheet";
import { cn } from "@/lib/utils";

import type { MobileFilterGroup, MobileFilterValue } from "./types";

const props = withDefaults(
  defineProps<{
    open: boolean;
    groups: MobileFilterGroup[];
    value?: MobileFilterValue;
    title?: string;
    class?: string;
  }>(),
  { title: "Filters" },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  apply: [value: MobileFilterValue];
  reset: [];
}>();

const selected = ref<MobileFilterValue>(
  props.value ? { ...props.value } : {},
);

watch(
  () => props.value,
  (value) => {
    selected.value = value ? { ...value } : {};
  },
);

const selectedCount = computed(() =>
  Object.values(selected.value).reduce(
    (total, entries) => total + entries.length,
    0,
  ),
);

function toggle(groupId: string, option: string) {
  const currentGroup = selected.value[groupId] ?? [];
  const next = currentGroup.includes(option)
    ? currentGroup.filter((entry) => entry !== option)
    : [...currentGroup, option];

  selected.value = { ...selected.value, [groupId]: next };
}

function reset() {
  selected.value = {};
  emit("reset");
}

function apply() {
  emit("apply", selected.value);
  emit("update:open", false);
}

function isActive(groupId: string, option: string) {
  return (selected.value[groupId] ?? []).includes(option);
}
</script>

<template>
  <BottomSheet
    :open="props.open"
    @update:open="emit('update:open', $event)"
  >
    <BottomSheetContent :class="props.class">
      <BottomSheetHeader>
        <BottomSheetTitle>{{ props.title }}</BottomSheetTitle>
        <BottomSheetDescription>
          Narrow the results, then apply.
        </BottomSheetDescription>
      </BottomSheetHeader>

      <div class="grid gap-4">
        <fieldset
          v-for="group in props.groups"
          :key="group.id"
          class="grid gap-2"
        >
          <legend
            class="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            {{ group.label }}
          </legend>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in group.options"
              :key="option.value"
              type="button"
              :aria-pressed="isActive(group.id, option.value)"
              :class="
                cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                  isActive(group.id, option.value)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-accent',
                )
              "
              @click="toggle(group.id, option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <BottomSheetFooter class="flex-row gap-2">
        <Button variant="outline" class="flex-1" @click="reset">
          Reset
        </Button>
        <Button class="flex-1" @click="apply">
          Apply{{ selectedCount ? ` (${selectedCount})` : " filters" }}
        </Button>
      </BottomSheetFooter>
    </BottomSheetContent>
  </BottomSheet>
</template>
