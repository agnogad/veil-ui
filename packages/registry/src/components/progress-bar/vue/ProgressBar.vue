<script setup lang="ts">
import { Progress } from "@/components/ui/progress";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ class?: string; value?: number | null }>();
</script>

<template>
  <Progress :value="value" :class="props.class" v-bind="$attrs" />
</template>
