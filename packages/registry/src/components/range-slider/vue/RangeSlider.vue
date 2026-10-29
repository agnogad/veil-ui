<script setup lang="ts">
import { Slider } from "@/components/ui/slider";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <Slider v-bind="$attrs" :min-steps-between-thumbs="1" />
</template>
