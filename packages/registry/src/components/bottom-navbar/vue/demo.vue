<script setup lang="ts">
import { Home, Settings, User } from "lucide-vue-next";

import { BottomNavbar } from "./index";
</script>

<template>
  <BottomNavbar
    class="mx-auto max-w-sm rounded-md border"
    :items="[
      { label: 'Home', icon: Home, href: '#home', active: true },
      { label: 'Account', icon: User, href: '#account' },
      { label: 'Settings', icon: Settings, href: '#settings' },
    ]"
  />
</template>
