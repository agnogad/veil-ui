<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";

defineProps<{ class?: string }>();
</script>

<template>
  <Toaster :class="$props.class" />
</template>
