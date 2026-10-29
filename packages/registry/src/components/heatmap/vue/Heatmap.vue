<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    data: number[][];
    rows: string[];
    columns: string[];
    max?: number;
    label?: string;
    class?: string;
  }>(),
  { label: "Heatmap" },
);

const peak = computed(() => props.max ?? Math.max(1, ...props.data.flat()));

function cellValue(rowIndex: number, columnIndex: number) {
  return props.data[rowIndex]?.[columnIndex] ?? 0;
}

function cellStyle(value: number) {
  const ratio = Math.min(1, Math.max(0, value / peak.value));
  return {
    backgroundColor: `color-mix(in oklab, var(--primary) ${Math.round(
      ratio * 85,
    )}%, transparent)`,
  };
}
</script>

<template>
  <div
    data-slot="heatmap"
    :class="cn('w-full overflow-x-auto', props.class)"
  >
    <table class="w-full border-collapse text-xs" :aria-label="label">
      <thead>
        <tr>
          <th scope="col" class="p-1.5" aria-hidden="true" />
          <th
            v-for="column in columns"
            :key="column"
            scope="col"
            class="p-1.5 text-center font-normal text-muted-foreground"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="row">
          <th
            scope="row"
            class="whitespace-nowrap p-1.5 pr-3 text-left font-normal text-muted-foreground"
          >
            {{ row }}
          </th>
          <td v-for="(column, columnIndex) in columns" :key="column" class="p-1">
            <div
              role="img"
              class="flex h-8 min-w-10 items-center justify-center rounded-sm border border-border/40 font-medium tabular-nums"
              :style="cellStyle(cellValue(rowIndex, columnIndex))"
              :aria-label="`${row}, ${column}: ${cellValue(rowIndex, columnIndex)}`"
            >
              {{ cellValue(rowIndex, columnIndex) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
