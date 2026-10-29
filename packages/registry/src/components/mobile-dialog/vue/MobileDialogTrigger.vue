<script setup lang="ts">
import { DialogTrigger } from "@/components/ui/modal";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <DialogTrigger v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>
