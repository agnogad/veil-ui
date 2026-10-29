<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    :class="
      cn('inline-flex size-5 items-center justify-center [&>svg]:size-4', props.class)
    "
  >
    <MoreHorizontal aria-hidden="true" />
    <span class="sr-only">More pages</span>
  </span>
</template>
