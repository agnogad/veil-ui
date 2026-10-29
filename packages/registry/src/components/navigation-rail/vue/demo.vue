<script setup lang="ts">
import { Folder, Home, Settings, Users } from "lucide-vue-next";

import { NavigationRail } from "./index";
</script>

<template>
  <div class="flex gap-4">
    <NavigationRail
      class="h-64 rounded-md border"
      :items="[
        { label: 'Home', icon: Home, href: '#home' },
        { label: 'Projects', icon: Folder, href: '#projects' },
        { label: 'Members', icon: Users, href: '#members' },
        { label: 'Settings', icon: Settings, href: '#settings' },
      ]"
    />
    <NavigationRail
      class="h-64 rounded-md border"
      :items="[
        { label: 'Home', icon: Home, href: '#home' },
        { label: 'Projects', icon: Folder, href: '#projects', active: true },
        { label: 'Members', icon: Users, href: '#members' },
        { label: 'Settings', icon: Settings, href: '#settings' },
      ]"
    />
  </div>
</template>
