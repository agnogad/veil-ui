<script setup lang="ts">
import { inject } from "vue";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { FORM_FIELD_KEY } from "./context";

const props = defineProps<{ class?: string; for?: string }>();

const ctx = inject(FORM_FIELD_KEY, null);
</script>

<template>
  <Label
    data-slot="form-field-label"
    :for="props.for ?? ctx?.controlId.value"
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot />
    <span
      v-if="ctx?.required.value"
      class="text-destructive"
      aria-hidden="true"
    >
      *
    </span>
    <span
      v-else-if="ctx?.optional.value"
      class="text-xs font-normal text-muted-foreground"
    >
      (optional)
    </span>
  </Label>
</template>
