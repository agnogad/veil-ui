<script setup lang="ts">
import { cn } from "@/lib/utils";

import type { TableOfContentsProps } from "./types";

const props = withDefaults(defineProps<TableOfContentsProps>(), {
  label: "On this page",
});

function handleClick(event: MouseEvent, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
  props.onNavigate?.(id);
}
</script>

<template>
  <nav
    data-slot="table-of-contents"
    :aria-label="label"
    :class="cn('text-sm', props.class)"
  >
    <p
      class="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
    >
      {{ label }}
    </p>
    <ul class="grid gap-0.5 border-l">
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          :aria-current="activeId === item.id ? 'location' : undefined"
          :class="
            cn(
              '-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground',
              item.level === 3 && 'pl-6',
              item.level === 4 && 'pl-9',
              activeId === item.id &&
                'border-foreground font-medium text-foreground',
            )
          "
          @click="handleClick($event, item.id)"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>
