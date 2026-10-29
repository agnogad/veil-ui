<script setup lang="ts">
import { Bell, Home, Plus, Search } from "lucide-vue-next";
import { computed, ref } from "vue";

import { BottomNavigation } from "./index";
import type { BottomNavigationItem } from "./index";

const destinations: BottomNavigationItem[] = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Alerts", icon: Bell, badge: "3" },
];

const active = ref("Home");
const items = computed(() =>
  destinations.map((item) => ({
    ...item,
    active: item.label === active.value,
  })),
);

function handleSelect(item: BottomNavigationItem) {
  active.value = item.label;
}
</script>

<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <BottomNavigation :items="items" class="rounded-md border" :on-select="handleSelect" />
    <p class="text-center text-sm text-muted-foreground">
      Active: {{ active }}
    </p>

    <div class="rounded-xl border bg-muted/30 p-3">
      <BottomNavigation
        variant="floating"
        :items="[
          { label: 'Home', icon: Home, href: '#home', active: true },
          { label: 'Search', icon: Search, href: '#search' },
          { label: 'Create', icon: Plus, href: '#create' },
          { label: 'Alerts', icon: Bell, href: '#alerts', badge: '5' },
        ]"
      />
    </div>
  </div>
</template>
