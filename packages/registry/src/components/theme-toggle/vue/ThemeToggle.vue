<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { onMounted, ref } from "vue";

import { IconButton } from "@/components/ui/icon-button";
import type { IconButtonVariants } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const props = withDefaults(
  defineProps<{
    storageKey?: string;
    variant?: IconButtonVariants["variant"];
    size?: IconButtonVariants["size"];
    class?: string;
  }>(),
  { storageKey: "veil-theme", variant: "ghost" },
);

const emit = defineEmits<{ change: [theme: Theme] }>();

const theme = ref<Theme>("light");

onMounted(() => {
  theme.value = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
});

function toggle() {
  const next: Theme = theme.value === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(props.storageKey, next);
  } catch {
    // Storage can be unavailable in private or sandboxed contexts.
  }
  theme.value = next;
  emit("change", next);
}
</script>

<template>
  <IconButton
    data-slot="theme-toggle"
    :data-theme="theme"
    :variant="variant"
    :size="size"
    :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-pressed="theme === 'dark'"
    :class="cn(props.class)"
    @click="toggle"
  >
    <Sun v-if="theme === 'dark'" aria-hidden="true" />
    <Moon v-else aria-hidden="true" />
  </IconButton>
</template>
