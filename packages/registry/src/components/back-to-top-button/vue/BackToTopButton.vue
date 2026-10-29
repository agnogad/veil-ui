<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { Button } from "@/components/ui/button";

const props = withDefaults(
  defineProps<{
    /** Scroll distance in pixels before the button appears. */
    threshold?: number;
    label?: string;
    /** Control visibility yourself instead of tracking window scroll. */
    visible?: boolean;
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
    size?: "sm" | "default" | "lg" | "icon";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    class?: string;
  }>(),
  { threshold: 400, label: "Back to top", type: "button" },
);

const emit = defineEmits<{ scrollToTop: [] }>();

const scrolled = ref(false);

function handleScroll() {
  scrolled.value = window.scrollY > props.threshold;
}

onMounted(() => {
  if (props.visible !== undefined) return;
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const shown = computed(() => props.visible ?? scrolled.value);

function handleClick() {
  emit("scrollToTop");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <Button
    v-if="shown"
    data-slot="back-to-top-button"
    :aria-label="label"
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :type="type"
    :class="props.class"
    @click="handleClick"
  >
    <ArrowUp aria-hidden />
  </Button>
</template>
