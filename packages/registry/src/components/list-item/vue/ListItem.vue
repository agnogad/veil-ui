<script setup lang="ts">
import { ListItem } from "@/components/ui/list-view";

const props = defineProps<{
  title: string;
  description?: string;
  class?: string;
}>();
</script>

<template>
  <ListItem :title="props.title" :description="props.description" :class="props.class">
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>
    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
    <slot />
  </ListItem>
</template>
