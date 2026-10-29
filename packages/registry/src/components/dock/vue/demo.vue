<script setup lang="ts">
import { Folder, Home, Search, Settings } from "lucide-vue-next";

import { Dock } from "./index";
</script>

<template>
  <div class="grid gap-4">
    <Dock
      :items="[
        { label: 'Home', icon: Home, href: '#home' },
        { label: 'Search', icon: Search, href: '#search', active: true },
        { label: 'Files', icon: Folder, href: '#files' },
        { label: 'Settings', icon: Settings, href: '#settings' },
      ]"
    />
    <Dock
      label="Applications"
      :items="[
        { label: 'Home', icon: Home, href: '#home' },
        { label: 'Files', icon: Folder, href: '#files' },
        { label: 'Settings', icon: Settings, href: '#settings' },
      ]"
    />
  </div>
</template>
