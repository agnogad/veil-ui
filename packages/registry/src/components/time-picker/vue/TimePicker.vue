<script setup lang="ts">
import { ClockIcon } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    /** Time in 24-hour `HH:mm` format. */
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    /** Accessible name for the trigger. */
    label?: string;
    disabled?: boolean;
    /** Minute increment offered in the list. Defaults to 5. */
    minuteStep?: number;
    class?: string;
  }>(),
  {
    placeholder: "Pick a time",
    label: "Choose time",
    disabled: false,
    minuteStep: 5,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  valueChange: [value: string];
}>();

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function parseTime(value: string | undefined) {
  const match = value?.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

const optionClass =
  "flex h-8 w-14 shrink-0 items-center justify-center rounded-md text-sm tabular-nums outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring";

const open = ref(false);
const internal = ref<string | undefined>(props.defaultValue);
const current = computed(
  () => props.value ?? props.modelValue ?? internal.value,
);
const parsed = computed(() => parseTime(current.value));
const step = computed(() => (props.minuteStep > 0 ? props.minuteStep : 5));

const hours = Array.from({ length: 24 }, (_, index) => index);
const minutes = computed(() =>
  Array.from(
    { length: Math.ceil(60 / step.value) },
    (_, index) => index * step.value,
  ).filter((minute) => minute < 60),
);

function commit(hoursValue: number, minutesValue: number) {
  const next = `${pad(hoursValue)}:${pad(minutesValue)}`;
  internal.value = next;
  emit("update:modelValue", next);
  emit("valueChange", next);
}

function onNativeInput(event: Event) {
  const raw = (event.target as HTMLInputElement).value;
  const match = parseTime(raw);
  if (match) commit(match.hours, match.minutes);
}
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
            'w-40 justify-start font-normal',
            !current && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <ClockIcon class="size-4 opacity-60" />
        {{ current ?? placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      data-slot="time-picker-content"
      :aria-label="label"
      align="start"
      :side-offset="4"
      class="p-3"
    >
      <label class="grid gap-1">
        <span class="text-xs font-medium text-muted-foreground">Time</span>
        <input
          type="time"
          :aria-label="`${label}, time input`"
          :value="current ?? ''"
          :step="step * 60"
          :disabled="disabled"
          class="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm tabular-nums shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          @input="onNativeInput"
        />
      </label>

      <div class="mt-3 flex gap-2">
        <div
          role="listbox"
          aria-label="Hours"
          class="flex max-h-52 w-16 flex-col gap-1 overflow-y-auto p-0.5"
        >
          <button
            v-for="hour in hours"
            :key="hour"
            type="button"
            role="option"
            :aria-selected="parsed?.hours === hour"
            :aria-label="`${pad(hour)} hours`"
            :class="
              cn(
                optionClass,
                parsed?.hours === hour &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              )
            "
            @click="commit(hour, parsed?.minutes ?? 0)"
          >
            {{ pad(hour) }}
          </button>
        </div>
        <div
          role="listbox"
          aria-label="Minutes"
          class="flex max-h-52 w-16 flex-col gap-1 overflow-y-auto p-0.5"
        >
          <button
            v-for="minute in minutes"
            :key="minute"
            type="button"
            role="option"
            :aria-selected="parsed?.minutes === minute"
            :aria-label="`${pad(minute)} minutes`"
            :class="
              cn(
                optionClass,
                parsed?.minutes === minute &&
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              )
            "
            @click="commit(parsed?.hours ?? 0, minute)"
          >
            {{ pad(minute) }}
          </button>
        </div>
      </div>

      <div class="mt-3 flex justify-end border-t pt-3">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          @click="open = false"
        >
          Done
        </Button>
      </div>
    </PopoverContent>
  </PopoverRoot>
</template>
