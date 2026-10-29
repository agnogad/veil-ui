<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <td
    data-slot="table-cell"
    :class="cn('whitespace-nowrap p-3 align-middle', props.class)"
  >
    <slot />
  </td>
</template>
