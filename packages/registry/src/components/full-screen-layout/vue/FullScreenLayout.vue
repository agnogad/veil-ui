<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    centered?: boolean;
    padded?: boolean;
    class?: string;
  }>(),
  {
    centered: false,
    padded: false,
  },
);
</script>

<template>
  <div
    data-slot="full-screen-layout"
    :class="cn('flex min-h-dvh flex-col bg-background', props.class)"
  >
    <header
      v-if="$slots.header"
      data-slot="full-screen-layout-header"
      class="border-b"
    >
      <div class="px-4 py-3 sm:px-6">
        <slot name="header" />
      </div>
    </header>
    <main
      data-slot="full-screen-layout-main"
      :class="
        cn(
          'flex flex-1 flex-col',
          props.centered && 'items-center justify-center',
          props.padded && 'p-4 sm:p-6',
        )
      "
    >
      <slot />
    </main>
    <footer
      v-if="$slots.footer"
      data-slot="full-screen-layout-footer"
      class="border-t"
    >
      <div class="px-4 py-3 sm:px-6">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>
