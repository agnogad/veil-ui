<script setup lang="ts">
import { TableRow as TableRowPrimitive } from "@/components/ui/table";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <TableRowPrimitive :class="props.class">
    <slot />
  </TableRowPrimitive>
</template>
