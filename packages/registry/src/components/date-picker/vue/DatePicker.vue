<script setup lang="ts">
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    value?: Date;
    modelValue?: Date;
    defaultValue?: Date;
    placeholder?: string;
    /** Accessible name for the trigger. */
    label?: string;
    disabled?: boolean;
    class?: string;
    formatDate?: (date: Date) => string;
    /** First selectable day. */
    fromDate?: Date;
    /** Last selectable day. */
    toDate?: Date;
    /** Alias for `fromDate`. */
    min?: Date;
    /** Alias for `toDate`. */
    max?: Date;
  }>(),
  {
    placeholder: "Pick a date",
    label: "Choose date",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [date: Date | undefined];
  valueChange: [date: Date | undefined];
}>();

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function defaultFormatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const open = ref(false);
const internal = ref<Date | undefined>(props.defaultValue);
const selected = computed(
  () => props.value ?? props.modelValue ?? internal.value,
);
const viewedMonth = ref(startOfMonth(selected.value ?? new Date()));
const today = startOfDay(new Date());

const formatDate = computed<(date: Date) => string>(
  () => props.formatDate ?? defaultFormatDate,
);

const monthLabel = computed(() =>
  viewedMonth.value.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  }),
);

const days = computed(() => {
  const year = viewedMonth.value.getFullYear();
  const month = viewedMonth.value.getMonth();
  const first = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - first.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );
    return {
      date,
      label: date.getDate(),
      outside: date.getMonth() !== month,
      today: isSameDay(date, today),
      selected: selected.value ? isSameDay(date, selected.value) : false,
      disabled: isDisabled(date),
    };
  });
});

function isDisabled(date: Date) {
  const day = startOfDay(date);
  const from = props.fromDate ?? props.min;
  const to = props.toDate ?? props.max;
  if (from && day < startOfDay(from)) return true;
  if (to && day > startOfDay(to)) return true;
  return false;
}

function moveMonth(offset: number) {
  viewedMonth.value = new Date(
    viewedMonth.value.getFullYear(),
    viewedMonth.value.getMonth() + offset,
    1,
  );
}

function select(date: Date) {
  if (isDisabled(date)) return;
  internal.value = date;
  emit("update:modelValue", date);
  emit("valueChange", date);
  open.value = false;
}

watch(open, (isOpen) => {
  if (isOpen) viewedMonth.value = startOfMonth(selected.value ?? new Date());
});
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        type="button"
        variant="outline"
        :aria-label="label"
        aria-haspopup="dialog"
        :aria-expanded="open"
        :disabled="disabled"
        :class="
          cn(
            'w-60 justify-start font-normal',
            !selected && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <CalendarIcon class="size-4 opacity-60" />
        <span class="truncate">
          {{ selected ? formatDate(selected) : placeholder }}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      data-slot="date-picker-content"
      :aria-label="label"
      align="start"
      :side-offset="4"
      class="w-auto p-0"
    >
      <div class="w-fit p-3">
        <div class="relative flex h-8 items-center justify-center">
          <button
            type="button"
            aria-label="Go to the previous month"
            class="absolute left-0 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
            @click="moveMonth(-1)"
          >
            <ChevronLeft class="size-4" aria-hidden />
          </button>
          <span class="text-sm font-medium">{{ monthLabel }}</span>
          <button
            type="button"
            aria-label="Go to the next month"
            class="absolute right-0 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
            @click="moveMonth(1)"
          >
            <ChevronRight class="size-4" aria-hidden />
          </button>
        </div>

        <div class="mt-2 flex">
          <span
            v-for="weekday in weekdays"
            :key="weekday"
            class="w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground"
          >
            {{ weekday }}
          </span>
        </div>

        <div class="mt-1 grid grid-cols-7 gap-1">
          <button
            v-for="day in days"
            :key="day.date.toISOString()"
            type="button"
            :aria-label="formatDate(day.date)"
            :aria-selected="day.selected"
            :disabled="day.disabled"
            :class="
              cn(
                'inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums outline-none transition-colors',
                'hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                'disabled:pointer-events-none disabled:opacity-50',
                day.outside && 'text-muted-foreground/50',
                day.today && !day.selected && 'bg-accent text-accent-foreground',
                day.selected &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              )
            "
            @click="select(day.date)"
          >
            {{ day.label }}
          </button>
        </div>
      </div>
    </PopoverContent>
  </PopoverRoot>
</template>
