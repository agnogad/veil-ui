<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useSlots } from "vue";

import { cn } from "@/lib/utils";

import { FORM_FIELD_KEY } from "./context";

const props = defineProps<{ class?: string; id?: string }>();

const ctx = inject(FORM_FIELD_KEY, null);
const slots = useSlots();
const hasContent = computed(() => Boolean(slots.default));

onMounted(() => {
  if (ctx && hasContent.value) ctx.hasError.value = true;
});
onBeforeUnmount(() => {
  if (ctx) ctx.hasError.value = false;
});

const id = computed(() => props.id ?? ctx?.errorId.value);
</script>

<template>
  <p
    v-if="hasContent"
    :id="id"
    data-slot="form-field-error"
    role="alert"
    :class="cn('text-sm font-medium text-destructive', props.class)"
  >
    <slot />
  </p>
</template>
