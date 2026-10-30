<script setup lang="ts">
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-vue-next";
import { computed, ref } from "vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn[];
    data: Array<Record<string, unknown>>;
    caption?: string;
    emptyMessage?: string;
    class?: string;
  }>(),
  { emptyMessage: "No results." },
);

type SortState = { key: string; direction: "asc" | "desc" };

const sort = ref<SortState | null>(null);

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const sorted = computed(() => {
  const rows = [...props.data];
  const current = sort.value;
  if (!current) return rows;
  return rows.sort((a, b) => {
    const result = String(a[current.key] ?? "").localeCompare(
      String(b[current.key] ?? ""),
      undefined,
      { numeric: true },
    );
    return current.direction === "asc" ? result : -result;
  });
});

function toggleSort(key: string) {
  if (sort.value?.key !== key) {
    sort.value = { key, direction: "asc" };
  } else if (sort.value.direction === "asc") {
    sort.value = { key, direction: "desc" };
  } else {
    sort.value = null;
  }
}

function ariaSort(column: DataTableColumn) {
  if (sort.value?.key === column.key) {
    return sort.value.direction === "asc" ? "ascending" : "descending";
  }
  return column.sortable ? "none" : undefined;
}
</script>

<template>
  <div data-slot="data-table" :class="cn('w-full', props.class)">
    <Table>
      <caption v-if="caption" class="mb-3 text-left text-sm font-medium">
        {{ caption }}
      </caption>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="column in columns"
            :key="column.key"
            :aria-sort="ariaSort(column)"
            :class="alignClass[column.align ?? 'left']"
          >
            <button
              v-if="column.sortable"
              type="button"
              class="inline-flex items-center gap-1 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              @click="toggleSort(column.key)"
            >
              {{ column.header }}
              <ArrowUp
                v-if="sort?.key === column.key && sort.direction === 'asc'"
                class="size-3.5"
                aria-hidden="true"
              />
              <ArrowDown
                v-else-if="sort?.key === column.key"
                class="size-3.5"
                aria-hidden="true"
              />
              <ChevronsUpDown v-else class="size-3.5" aria-hidden="true" />
            </button>
            <template v-else>{{ column.header }}</template>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="sorted.length === 0">
          <TableCell
            :colspan="columns.length"
            class="py-8 text-center text-muted-foreground"
          >
            {{ emptyMessage }}
          </TableCell>
        </TableRow>
        <TableRow v-for="(row, index) in sorted" v-else :key="index">
          <TableCell
            v-for="column in columns"
            :key="column.key"
            :class="alignClass[column.align ?? 'left']"
          >
            <slot :name="`cell-${column.key}`" :row="row">
              {{ row[column.key] ?? "" }}
            </slot>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
