<script setup lang="ts">
import { computed } from "vue";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { InputWithIconProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<InputWithIconProps>(), {
  position: "left",
});

const iconClasses = computed(() =>
  cn(
    "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
    props.position === "left" ? "left-3" : "right-3",
  ),
);

const inputClasses = computed(() =>
  cn(props.position === "left" ? "pl-9" : "pr-9", props.class),
);
</script>

<template>
  <div data-slot="input-with-icon" class="relative w-full">
    <component :is="props.icon" aria-hidden="true" :class="iconClasses" />
    <Input v-bind="$attrs" :class="inputClasses" />
  </div>
</template>
