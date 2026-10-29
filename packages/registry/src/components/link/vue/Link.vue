<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    href?: string;
    external?: boolean;
    tone?: "default" | "muted";
    target?: string;
    rel?: string;
    class?: string;
  }>(),
  { external: false, tone: "default" },
);

const resolvedTarget = computed(() =>
  props.target ?? (props.external ? "_blank" : undefined),
);
const resolvedRel = computed(() =>
  props.rel ?? (props.external ? "noopener noreferrer" : undefined),
);

const classes = computed(() =>
  cn(
    "rounded-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    props.tone === "muted" && "text-muted-foreground hover:text-foreground",
    props.class,
  ),
);
</script>

<template>
  <a
    data-slot="link"
    :href="props.href"
    :target="resolvedTarget"
    :rel="resolvedRel"
    :class="classes"
  >
    <slot />
  </a>
</template>
