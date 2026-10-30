<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import { cn } from "@/lib/utils";

import type { CalendarDisabledMatcher, CalendarRange } from "./types";

const props = withDefaults(
  defineProps<{
    mode?: "single" | "range" | "multiple";
    selected?: Date | CalendarRange | Date[] | null;
    month?: Date;
    defaultMonth?: Date;
    showOutsideDays?: boolean;
    captionLayout?: "label" | "dropdown";
    startMonth?: Date;
    endMonth?: Date;
    disabled?: CalendarDisabledMatcher;
    class?: string;
    label?: string;
  }>(),
  {
    mode: "single",
    showOutsideDays: true,
    captionLayout: "label",
    label: "Calendar",
  },
);

const emit = defineEmits<{
  "update:selected": [value: Date | CalendarRange | Date[] | undefined];
  "update:month": [value: Date];
  select: [value: Date | CalendarRange | Date[] | undefined];
}>();

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const viewMonth = ref(
  new Date(
    (props.month ?? props.defaultMonth ?? new Date()).getFullYear(),
    (props.month ?? props.defaultMonth ?? new Date()).getMonth(),
    1,
  ),
);

watch(
  () => props.month,
  (value) => {
    if (value) viewMonth.value = new Date(value.getFullYear(), value.getMonth(), 1);
  },
);

const selectedDates = computed<Date[]>(() => {
  if (!props.selected) return [];
  if (props.selected instanceof Date) return [props.selected];
  if (Array.isArray(props.selected)) return props.selected;
  if (props.selected.from && props.selected.to) {
    const days: Date[] = [];
    const cursor = new Date(
      props.selected.from.getFullYear(),
      props.selected.from.getMonth(),
      props.selected.from.getDate(),
    );
    while (cursor <= props.selected.to) {
      days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }
  return [props.selected.from, props.selected.to].filter(Boolean) as Date[];
});

const rangeMiddle = computed<Date[]>(() => {
  const value = props.selected;
  if (props.mode !== "range" || !value || Array.isArray(value) || value instanceof Date) {
    return [];
  }
  if (!value.from || !value.to) return [];
  return selectedDates.value.filter(
    (date) => date.getTime() !== value.from!.getTime() && date.getTime() !== value.to!.getTime(),
  );
});

const days = computed(() => {
  const year = viewMonth.value.getFullYear();
  const month = viewMonth.value.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const cells: Array<{
    date: Date;
    outside: boolean;
    today: boolean;
    selected: boolean;
    middle: boolean;
    disabled: boolean;
  }> = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    cells.push({
      date,
      outside: date.getMonth() !== month,
      today: isSameDay(date, new Date()),
      selected: selectedDates.value.some((value) => isSameDay(value, date)),
      middle: rangeMiddle.value.some((value) => isSameDay(value, date)),
      disabled: isDisabled(date),
    });
  }

  const weeks: typeof cells[] = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
});

const monthLabel = computed(() =>
  new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(viewMonth.value),
);

const monthOptions = computed(() => {
  const start = props.startMonth ?? new Date(1926, 0);
  const end = props.endMonth ?? new Date(2126, 11);
  const options: Date[] = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  while (cursor <= end && options.length < 1200) {
    options.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return options;
});

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isDisabled(date: Date) {
  const value = props.disabled;
  if (!value) return false;
  if (typeof value === "function") return value(date);
  if (Array.isArray(value)) return value.some((item) => isSameDay(item, date));
  if (value.before && date < new Date(value.before.getFullYear(), value.before.getMonth(), value.before.getDate())) {
    return true;
  }
  if (value.after && date > new Date(value.after.getFullYear(), value.after.getMonth(), value.after.getDate())) {
    return true;
  }
  if (value.dayOfWeek?.includes(date.getDay())) return true;
  return false;
}

function changeMonth(delta: number) {
  viewMonth.value = new Date(
    viewMonth.value.getFullYear(),
    viewMonth.value.getMonth() + delta,
    1,
  );
  emit("update:month", viewMonth.value);
}

function selectDate(date: Date) {
  if (isDisabled(date)) return;

  if (props.mode === "multiple") {
    const existing = selectedDates.value;
    const next = existing.some((value) => isSameDay(value, date))
      ? existing.filter((value) => !isSameDay(value, date))
      : [...existing, date];
    emit("update:selected", next);
    emit("select", next);
    return;
  }

  if (props.mode === "range") {
    const value = props.selected;
    const current =
      value && !Array.isArray(value) && !(value instanceof Date) ? value : {};
    let next: CalendarRange;
    if (!current.from || (current.from && current.to)) {
      next = { from: date, to: undefined };
    } else if (date < current.from) {
      next = { from: date, to: current.from };
    } else {
      next = { from: current.from, to: date };
    }
    emit("update:selected", next);
    emit("select", next);
    return;
  }

  emit("update:selected", date);
  emit("select", date);
}
</script>

<template>
  <div
    data-slot="calendar"
    :aria-label="label"
    :class="cn('w-fit p-3', props.class)"
  >
    <div class="flex flex-col gap-4">
      <div class="relative flex h-8 items-center justify-center">
        <button
          type="button"
          aria-label="Go to the previous month"
          class="absolute left-0 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
          @click="changeMonth(-1)"
        >
          <ChevronLeft class="size-4" aria-hidden="true" />
        </button>

        <div v-if="captionLayout === 'dropdown'" class="flex items-center gap-1">
          <select
            aria-label="Month"
            class="rounded-md border border-input bg-transparent px-2 py-1 text-sm"
            :value="viewMonth.getMonth()"
            @change="
              viewMonth = new Date(
                viewMonth.getFullYear(),
                Number(($event.target as HTMLSelectElement).value),
                1,
              )
            "
          >
            <option
              v-for="(month, index) in monthOptions
                .filter((option) => option.getFullYear() === viewMonth.getFullYear())
                .map((option) => option.getMonth())"
              :key="month"
              :value="month"
            >
              {{ new Intl.DateTimeFormat(undefined, { month: 'long' }).format(new Date(2020, month, 1)) }}
            </option>
          </select>
          <select
            aria-label="Year"
            class="rounded-md border border-input bg-transparent px-2 py-1 text-sm"
            :value="viewMonth.getFullYear()"
            @change="
              viewMonth = new Date(
                Number(($event.target as HTMLSelectElement).value),
                viewMonth.getMonth(),
                1,
              )
            "
          >
            <option
              v-for="year in [...new Set(monthOptions.map((option) => option.getFullYear()))]"
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>
        <span v-else class="text-sm font-medium">{{ monthLabel }}</span>

        <button
          type="button"
          aria-label="Go to the next month"
          class="absolute right-0 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
          @click="changeMonth(1)"
        >
          <ChevronRight class="size-4" aria-hidden="true" />
        </button>
      </div>

      <table role="grid" class="w-full border-collapse" :aria-label="monthLabel">
        <thead>
          <tr class="flex">
            <th
              v-for="weekday in weekdays"
              :key="weekday"
              scope="col"
              class="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
            >
              {{ weekday }}
            </th>
          </tr>
        </thead>
        <tbody class="mt-2 flex flex-col gap-1">
          <tr v-for="(week, weekIndex) in days" :key="weekIndex" class="flex w-full">
            <td v-for="day in week" :key="day.date.toISOString()" class="relative size-9 p-0 text-center text-sm">
              <button
                type="button"
                data-slot="calendar-day"
                :data-range-middle="day.middle || undefined"
                :aria-selected="day.selected || day.middle || undefined"
                :aria-current="day.today ? 'date' : undefined"
                :disabled="day.disabled"
                class="inline-flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
                :class="
                  cn(
                    'hover:bg-accent hover:text-accent-foreground',
                    day.outside && 'text-muted-foreground/50',
                    day.outside && !showOutsideDays && 'invisible',
                    day.today && !day.selected && 'bg-accent text-accent-foreground',
                    day.middle && 'rounded-none bg-accent text-accent-foreground',
                    day.selected &&
                      !day.middle &&
                      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                  )
                "
                @click="selectDate(day.date)"
              >
                {{ day.date.getDate() }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
