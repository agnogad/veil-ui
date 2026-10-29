<script setup lang="ts">
import { CalendarRangeIcon, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { DateRange } from "./types";

const props = withDefaults(
  defineProps<{
    value?: DateRange;
    modelValue?: DateRange;
    defaultValue?: DateRange;
    placeholder?: string;
    /** Accessible name for the trigger. */
    label?: string;
    disabled?: boolean;
    class?: string;
    /** Number of months shown side by side. */
    numberOfMonths?: number;
    /** Month shown when nothing is selected. */
    defaultMonth?: Date;
    /** First selectable day. */
    min?: Date;
    /** Last selectable day. */
    max?: Date;
  }>(),
  {
    placeholder: "Pick a date range",
    label: "Choose date range",
    disabled: false,
    numberOfMonths: 2,
  },
);

const emit = defineEmits<{
  "update:modelValue": [range: DateRange | undefined];
  valueChange: [range: DateRange | undefined];
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

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const open = ref(false);
const internal = ref<DateRange | undefined>(props.defaultValue);
const selected = computed(
  () => props.value ?? props.modelValue ?? internal.value,
);
const viewedMonth = ref(
  startOfMonth(selected.value?.from ?? props.defaultMonth ?? new Date()),
);
const today = startOfDay(new Date());

const summary = computed(() => {
  const range = selected.value;
  if (!range?.from) return props.placeholder;
  if (!range.to) return formatDay(range.from);
  return `${formatDay(range.from)} – ${formatDay(range.to)}`;
});

function isDisabled(date: Date) {
  const day = startOfDay(date).getTime();
  if (props.min && day < startOfDay(props.min).getTime()) return true;
  if (props.max && day > startOfDay(props.max).getTime()) return true;
  return false;
}

function buildMonth(base: Date) {
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - first.getDay());
  const range = selected.value;

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );
    const time = startOfDay(date).getTime();
    const from = range?.from ? startOfDay(range.from).getTime() : null;
    const to = range?.to ? startOfDay(range.to).getTime() : null;

    return {
      date,
      label: date.getDate(),
      outside: date.getMonth() !== month,
      today: isSameDay(date, today),
      isStart: from !== null && time === from,
      isEnd: to !== null && time === to,
      inRange: from !== null && to !== null && time > from && time < to,
      disabled: isDisabled(date),
    };
  });

  return {
    key: `${year}-${month}`,
    caption: base.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    }),
    days,
  };
}

const months = computed(() => {
  const count = Math.max(1, Math.floor(props.numberOfMonths));
  return Array.from({ length: count }, (_, index) =>
    buildMonth(
      new Date(
        viewedMonth.value.getFullYear(),
        viewedMonth.value.getMonth() + index,
        1,
      ),
    ),
  );
});

function moveMonth(offset: number) {
  viewedMonth.value = new Date(
    viewedMonth.value.getFullYear(),
    viewedMonth.value.getMonth() + offset,
    1,
  );
}

function select(date: Date) {
  if (isDisabled(date)) return;
  const range = selected.value;
  let next: DateRange;

  if (!range?.from || range.to) {
    next = { from: date };
  } else if (startOfDay(date).getTime() < startOfDay(range.from).getTime()) {
    next = { from: date, to: range.from };
  } else {
    next = { from: range.from, to: date };
  }

  internal.value = next;
  emit("update:modelValue", next);
  emit("valueChange", next);

  if (next.from && next.to) open.value = false;
}

watch(open, (isOpen) => {
  if (!isOpen) return;
  viewedMonth.value = startOfMonth(
    selected.value?.from ?? props.defaultMonth ?? new Date(),
  );
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
            'w-72 justify-start font-normal',
            !selected?.from && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <CalendarRangeIcon class="size-4 opacity-60" />
        <span class="truncate">{{ summary }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      data-slot="date-range-picker-content"
      :aria-label="label"
      align="start"
      :side-offset="4"
      class="w-auto p-0"
    >
      <div class="flex flex-col gap-4 p-3 sm:flex-row">
        <div
          v-for="(month, monthIndex) in months"
          :key="month.key"
          class="flex w-full flex-col gap-2"
        >
          <div class="relative flex h-8 items-center justify-center">
            <button
              v-if="monthIndex === 0"
              type="button"
              aria-label="Go to the previous month"
              class="absolute left-0 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
              @click="moveMonth(-1)"
            >
              <ChevronLeft class="size-4" aria-hidden />
            </button>
            <span class="text-sm font-medium">{{ month.caption }}</span>
            <button
              v-if="monthIndex === months.length - 1"
              type="button"
              aria-label="Go to the next month"
              class="absolute right-0 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
              @click="moveMonth(1)"
            >
              <ChevronRight class="size-4" aria-hidden />
            </button>
          </div>

          <div class="flex">
            <span
              v-for="weekday in weekdays"
              :key="weekday"
              class="w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground"
            >
              {{ weekday }}
            </span>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <button
              v-for="day in month.days"
              :key="day.date.toISOString()"
              type="button"
              :aria-label="formatDay(day.date)"
              :aria-selected="day.isStart || day.isEnd || day.inRange"
              :disabled="day.disabled"
              :class="
                cn(
                  'inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums outline-none transition-colors',
                  'hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                  'disabled:pointer-events-none disabled:opacity-50',
                  day.outside && 'text-muted-foreground/50',
                  day.today && !day.isStart && !day.isEnd && 'bg-accent text-accent-foreground',
                  day.inRange && 'rounded-none bg-accent text-accent-foreground',
                  (day.isStart || day.isEnd) &&
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                )
              "
              @click="select(day.date)"
            >
              {{ day.label }}
            </button>
          </div>
        </div>
      </div>
    </PopoverContent>
  </PopoverRoot>
</template>
