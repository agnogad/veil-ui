<script setup lang="ts">
import { Bell, Home, Settings, User } from "lucide-vue-next";

import {
  MobileTabBar,
  MobileTabBarContent,
  MobileTabBarItem,
  MobileTabBarList,
} from "./index";
</script>

<template>
  <div class="mx-auto w-full max-w-sm overflow-hidden rounded-lg border">
    <MobileTabBar default-value="home">
      <MobileTabBarContent value="home" class="p-4 text-sm">
        Home feed
      </MobileTabBarContent>
      <MobileTabBarContent value="alerts" class="p-4 text-sm">
        Alerts
      </MobileTabBarContent>
      <MobileTabBarContent value="profile" class="p-4 text-sm">
        Profile
      </MobileTabBarContent>
      <MobileTabBarList class="grid h-14 grid-cols-3 rounded-none border-t bg-background">
        <MobileTabBarItem value="home" class="flex-col gap-1 text-[10px]">
          <Home class="size-4" aria-hidden="true" /> Home
        </MobileTabBarItem>
        <MobileTabBarItem value="alerts" class="flex-col gap-1 text-[10px]">
          <Bell class="size-4" aria-hidden="true" /> Alerts
        </MobileTabBarItem>
        <MobileTabBarItem value="profile" class="flex-col gap-1 text-[10px]">
          <User class="size-4" aria-hidden="true" /> Profile
        </MobileTabBarItem>
      </MobileTabBarList>
    </MobileTabBar>
  </div>
  <div class="mx-auto mt-4 w-full max-w-sm overflow-hidden rounded-lg border">
    <MobileTabBar default-value="home">
      <MobileTabBarContent value="home" class="p-4 text-sm">
        Home feed
      </MobileTabBarContent>
      <MobileTabBarContent value="settings" class="p-4 text-sm">
        Settings
      </MobileTabBarContent>
      <MobileTabBarList class="grid h-14 grid-cols-2 rounded-none border-t bg-background">
        <MobileTabBarItem value="home" class="flex-col gap-1 text-[10px]">
          <Home class="size-4" aria-hidden="true" /> Home
        </MobileTabBarItem>
        <MobileTabBarItem value="settings" class="flex-col gap-1 text-[10px]">
          <Settings class="size-4" aria-hidden="true" /> Settings
        </MobileTabBarItem>
      </MobileTabBarList>
    </MobileTabBar>
  </div>
</template>
