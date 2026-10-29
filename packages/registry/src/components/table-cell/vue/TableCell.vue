<script setup lang="ts">
import { TableCell as TableCellPrimitive } from "@/components/ui/table";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <TableCellPrimitive :class="props.class">
    <slot />
  </TableCellPrimitive>
</template>
