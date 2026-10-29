<script setup lang="ts">
import { Toaster as ToastViewport } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <ToastViewport :class="cn('sm:max-w-sm', props.class)" />
</template>
