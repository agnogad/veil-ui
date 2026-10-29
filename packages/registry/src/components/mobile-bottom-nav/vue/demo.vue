<script setup lang="ts">
import { Bell, Home, Plus, Search, User } from "lucide-vue-next";

import { MobileBottomNav } from "./index";
</script>

<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <MobileBottomNav
      class="rounded-xl border"
      :items="[
        { label: 'Home', icon: Home, href: '#home', active: true },
        { label: 'Search', icon: Search, href: '#search', badge: '12' },
        { label: 'Alerts', icon: Bell, href: '#alerts', badge: '3' },
        { label: 'Profile', icon: User, href: '#profile', badge: '!' },
      ]"
    />

    <div class="rounded-xl border bg-muted/30 p-3">
      <MobileBottomNav
        variant="floating"
        :items="[
          { label: 'Home', icon: Home, href: '#home', active: true },
          { label: 'Search', icon: Search, href: '#search' },
          { label: 'Create', icon: Plus, href: '#create' },
          { label: 'Alerts', icon: Bell, href: '#alerts', badge: '5' },
          { label: 'Profile', icon: User, href: '#profile' },
        ]"
      />
    </div>
  </div>
</template>
