<script setup lang="ts">
import { Check } from "lucide-vue-next";

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
} from "@/components/ui/bottom-sheet";
import { cn } from "@/lib/utils";

interface MobilePickerOption {
  value: string;
  label: string;
  description?: string;
}

const props = defineProps<{
  title: string;
  description?: string;
  options: MobilePickerOption[];
  value?: string;
}>();

const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits<{ select: [value: string] }>();

function select(value: string) {
  emit("select", value);
  open.value = false;
}
</script>

<template>
  <BottomSheet v-model:open="open">
    <BottomSheetContent>
      <BottomSheetHeader>
        <BottomSheetTitle>{{ title }}</BottomSheetTitle>
        <BottomSheetDescription v-if="description">
          {{ description }}
        </BottomSheetDescription>
      </BottomSheetHeader>
      <div role="radiogroup" :aria-label="title" class="grid gap-1">
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          role="radio"
          :aria-checked="option.value === value"
          :class="
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring',
              option.value === value && 'bg-accent/60 font-medium',
            )
          "
          @click="select(option.value)"
        >
          <span class="min-w-0 flex-1">
            <span class="block truncate">{{ option.label }}</span>
            <span
              v-if="option.description"
              class="block truncate text-xs text-muted-foreground"
            >
              {{ option.description }}
            </span>
          </span>
          <Check
            v-if="option.value === value"
            class="size-4 text-primary"
            aria-hidden="true"
          />
        </button>
      </div>
    </BottomSheetContent>
  </BottomSheet>
</template>
