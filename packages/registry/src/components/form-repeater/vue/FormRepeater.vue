<script setup lang="ts">
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-vue-next";
import { computed, ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { FormRepeaterProps, RepeaterRow } from "./types";

const props = withDefaults(defineProps<FormRepeaterProps>(), {
  addLabel: "Add row",
  min: 1,
  disabled: false,
});

const emit = defineEmits<{
  "update:items": [rows: RepeaterRow[]];
  change: [rows: RepeaterRow[]];
}>();

function emptyRow(): RepeaterRow {
  return Object.fromEntries(props.fields.map((field) => [field.name, ""]));
}

const rows = ref<RepeaterRow[]>(
  props.defaultValue && props.defaultValue.length > 0
    ? props.defaultValue.map((row) => ({ ...row }))
    : [emptyRow()],
);

function update(next: RepeaterRow[]) {
  rows.value = next;
  emit("update:items", next);
  emit("change", next);
}

function add() {
  if (props.disabled) return;
  if (props.max !== undefined && rows.value.length >= props.max) return;
  update([...rows.value, emptyRow()]);
}

function remove(index: number) {
  if (props.disabled) return;
  if (rows.value.length <= props.min) return;
  update(rows.value.filter((_, position) => position !== index));
}

function move(index: number, offset: number) {
  const target = index + offset;
  if (props.disabled) return;
  if (target < 0 || target >= rows.value.length) return;
  const next = [...rows.value];
  const [row] = next.splice(index, 1);
  next.splice(target, 0, row);
  update(next);
}

function setValue(index: number, name: string, value: string) {
  update(
    rows.value.map((row, position) =>
      position === index ? { ...row, [name]: value } : row,
    ),
  );
}

const canRemove = computed(() => rows.value.length > props.min);
const canAdd = computed(
  () => props.max === undefined || rows.value.length < props.max,
);

defineExpose({ rows, add, remove, move });
</script>

<template>
  <div
    data-slot="form-repeater"
    :class="cn('flex flex-col gap-3', props.class)"
  >
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="rounded-lg border bg-card p-3 text-card-foreground"
    >
      <div class="mb-3 flex items-center justify-between gap-2">
        <span class="text-xs font-medium text-muted-foreground">
          Row {{ index + 1 }}
        </span>
        <div class="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="size-7"
            :aria-label="`Move row ${index + 1} up`"
            :disabled="disabled || index === 0"
            @click="move(index, -1)"
          >
            <ArrowUp aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="size-7"
            :aria-label="`Move row ${index + 1} down`"
            :disabled="disabled || index === rows.length - 1"
            @click="move(index, 1)"
          >
            <ArrowDown aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="size-7"
            :aria-label="`Remove row ${index + 1}`"
            :disabled="disabled || !canRemove"
            @click="remove(index)"
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <label
          v-for="field in fields"
          :key="field.name"
          class="flex flex-col gap-1 text-xs font-medium text-muted-foreground"
        >
          <span>{{ field.label }}</span>
          <Input
            :type="field.type ?? 'text'"
            :model-value="row[field.name] ?? ''"
            :placeholder="field.placeholder"
            :aria-label="`${field.label} row ${index + 1}`"
            :disabled="disabled"
            @update:model-value="setValue(index, field.name, $event)"
          />
        </label>
      </div>
    </div>
    <Button
      type="button"
      variant="outline"
      class="w-fit"
      :disabled="disabled || !canAdd"
      @click="add"
    >
      <Plus aria-hidden="true" />
      {{ addLabel }}
    </Button>
  </div>
</template>
