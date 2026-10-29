<script setup lang="ts">
import { AlertDialogAction } from "reka-ui";
import { computed } from "vue";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const classes = computed(() =>
  cn(buttonVariants({ variant: "destructive" }), props.class),
);
</script>

<template>
  <AlertDialogAction
    data-slot="alert-dialog-action"
    :class="classes"
  >
    <slot />
  </AlertDialogAction>
</template>
