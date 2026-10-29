<script setup lang="ts">
import { Check, Minus } from "lucide-vue-next";
import { computed } from "vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { ComparisonPlan, ComparisonRow } from "./types";

const props = defineProps<{
  plans: ComparisonPlan[];
  rows: ComparisonRow[];
  caption?: string;
  class?: string;
}>();

const matrix = computed(() =>
  props.rows.map((row) => ({
    feature: row.feature,
    values: props.plans.map((_, index) => row.values[index]),
  })),
);
</script>

<template>
  <Table data-slot="comparison-table" :class="cn(props.class)">
    <caption v-if="caption" class="mb-3 text-left text-sm font-medium">
      {{ caption }}
    </caption>
    <TableHeader>
      <TableRow>
        <TableHead>Feature</TableHead>
        <TableHead v-for="plan in plans" :key="plan.name" class="text-center">
          <span class="block font-medium text-foreground">{{ plan.name }}</span>
          <span
            v-if="plan.price"
            class="block text-xs font-normal text-muted-foreground"
          >
            {{ plan.price }}
          </span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in matrix" :key="row.feature">
        <TableCell class="font-medium">{{ row.feature }}</TableCell>
        <TableCell
          v-for="(plan, index) in plans"
          :key="plan.name"
          class="text-center"
        >
          <template v-if="typeof row.values[index] === 'boolean'">
            <span
              v-if="row.values[index]"
              class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
            >
              <Check class="size-4" aria-hidden="true" />
              <span class="sr-only">Included</span>
            </span>
            <span v-else class="inline-flex items-center gap-1 text-muted-foreground">
              <Minus class="size-4" aria-hidden="true" />
              <span class="sr-only">Not included</span>
            </span>
          </template>
          <template v-else>{{ row.values[index] }}</template>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
