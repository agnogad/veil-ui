<script setup lang="ts">
import { cn } from "@/lib/utils";

defineOptions({ inheritAttrs: false });

const sizes = {
  sm: { root: "gap-1.5", mark: "size-6", name: "text-sm" },
  md: { root: "gap-2", mark: "size-8", name: "text-base" },
  lg: { root: "gap-2.5", mark: "size-10", name: "text-lg" },
} as const;

const props = withDefaults(
  defineProps<{
    name: string;
    size?: keyof typeof sizes;
    href?: string;
    class?: string;
  }>(),
  { size: "md" },
);
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    class="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    <div
      data-slot="logo"
      :class="
        cn('inline-flex items-center', sizes[props.size].root, props.class)
      "
      v-bind="$attrs"
    >
      <span
        v-if="$slots.mark"
        data-slot="logo-mark"
        :class="
          cn(
            'flex shrink-0 items-center justify-center overflow-hidden rounded-md',
            sizes[props.size].mark,
          )
        "
      >
        <slot name="mark" />
      </span>
      <span
        data-slot="logo-name"
        :class="cn('font-semibold tracking-tight', sizes[props.size].name)"
      >
        {{ props.name }}
      </span>
    </div>
  </a>
  <div
    v-else
    data-slot="logo"
    :class="cn('inline-flex items-center', sizes[props.size].root, props.class)"
    v-bind="$attrs"
  >
    <span
      v-if="$slots.mark"
      data-slot="logo-mark"
      :class="
        cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-md',
          sizes[props.size].mark,
        )
      "
    >
      <slot name="mark" />
    </span>
    <span
      data-slot="logo-name"
      :class="cn('font-semibold tracking-tight', sizes[props.size].name)"
    >
      {{ props.name }}
    </span>
  </div>
</template>
