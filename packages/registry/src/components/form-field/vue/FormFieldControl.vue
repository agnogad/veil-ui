<script setup lang="ts">
import { Primitive } from "reka-ui";
import { inject } from "vue";

import { cn } from "@/lib/utils";

import { FORM_FIELD_KEY } from "./context";

const props = defineProps<{ class?: string }>();

const ctx = inject(FORM_FIELD_KEY, null);
</script>

<template>
  <Primitive
    as-child
    data-slot="form-field-control"
    :class="cn('w-full', props.class)"
    :id="ctx?.controlId.value"
    :aria-describedby="ctx?.describedBy.value"
    :aria-invalid="ctx?.invalid.value ? true : undefined"
  >
    <slot />
  </Primitive>
</template>
