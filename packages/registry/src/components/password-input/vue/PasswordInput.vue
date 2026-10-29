<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ class?: string }>();

const visible = ref(false);
</script>

<template>
  <div class="relative w-full">
    <Input
      v-bind="$attrs"
      :type="visible ? 'text' : 'password'"
      :class="cn('pr-10', props.class)"
    />
    <button
      type="button"
      :aria-label="visible ? 'Hide password' : 'Show password'"
      :aria-pressed="visible"
      class="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      @click="visible = !visible"
    >
      <EyeOff v-if="visible" class="size-4" aria-hidden="true" />
      <Eye v-else class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
