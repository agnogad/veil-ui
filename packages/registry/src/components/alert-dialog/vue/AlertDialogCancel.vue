<script setup lang="ts">
import { AlertDialogCancel } from "reka-ui";
import { computed } from "vue";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const classes = computed(() =>
  cn(buttonVariants({ variant: "outline" }), props.class),
);
</script>

<template>
  <AlertDialogCancel data-slot="alert-dialog-cancel" :class="classes">
    <slot />
  </AlertDialogCancel>
</template>
