<script setup lang="ts">
import { Bell } from "lucide-vue-next";
import { ref } from "vue";

import { SwipeToDismiss } from "./index";

const initial = [
  { id: 1, title: "Deployment finished", body: "Production is up to date." },
  { id: 2, title: "New comment", body: "Mira replied on “Design tokens”." },
  { id: 3, title: "Weekly digest", body: "Your team shipped 12 changes." },
];

const items = ref([...initial]);

function dismiss(id: number) {
  items.value = items.value.filter((entry) => entry.id !== id);
}
</script>

<template>
  <div class="grid w-full max-w-sm gap-2">
    <SwipeToDismiss
      v-for="item in items"
      :key="item.id"
      @dismiss="dismiss(item.id)"
    >
      <div class="flex items-start gap-3 p-4 pr-10">
        <Bell class="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
        <div class="text-sm">
          <p class="font-medium">{{ item.title }}</p>
          <p class="text-xs text-muted-foreground">{{ item.body }}</p>
        </div>
      </div>
    </SwipeToDismiss>
    <p
      v-if="items.length === 0"
      class="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground"
    >
      All caught up.
    </p>
  </div>
</template>
