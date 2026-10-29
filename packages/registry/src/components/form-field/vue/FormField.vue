<script setup lang="ts">
import { computed, provide, ref, useId } from "vue";

import { cn } from "@/lib/utils";

import { FORM_FIELD_KEY } from "./context";

const props = withDefaults(
  defineProps<{
    class?: string;
    /** Id applied to the control; generated when omitted. */
    id?: string;
    required?: boolean;
    optional?: boolean;
    invalid?: boolean;
  }>(),
  { required: false, optional: false, invalid: false },
);

const generatedId = useId();
const controlId = computed(() => props.id ?? `field-${generatedId}`);
const descriptionId = computed(() => `${controlId.value}-description`);
const errorId = computed(() => `${controlId.value}-error`);

const hasDescription = ref(false);
const hasError = ref(false);

const required = computed(() => props.required);
const optional = computed(() => props.optional);
const invalid = computed(() => props.invalid);

const describedBy = computed(() => {
  const ids: string[] = [];
  if (hasDescription.value) ids.push(descriptionId.value);
  if (hasError.value) ids.push(errorId.value);
  return ids.length > 0 ? ids.join(" ") : undefined;
});

provide(FORM_FIELD_KEY, {
  controlId,
  descriptionId,
  errorId,
  required,
  optional,
  invalid,
  describedBy,
  hasDescription,
  hasError,
});
</script>

<template>
  <div
    data-slot="form-field"
    :data-invalid="invalid ? true : undefined"
    :data-required="required ? true : undefined"
    :class="cn('grid gap-2', props.class)"
  >
    <slot />
  </div>
</template>
