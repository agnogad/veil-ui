<script setup lang="ts">
import { CircleDot, LayoutGrid } from "lucide-vue-next";

import { TabBar, TabBarContent, TabBarItem, TabBarList } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <TabBar default-value="overview">
      <TabBarList class="w-full">
        <TabBarItem value="overview">Overview</TabBarItem>
        <TabBarItem value="activity">Activity</TabBarItem>
        <TabBarItem value="settings">Settings</TabBarItem>
      </TabBarList>
      <TabBarContent value="overview" class="p-2 text-sm">
        Project overview.
      </TabBarContent>
      <TabBarContent value="activity" class="p-2 text-sm">
        Recent activity.
      </TabBarContent>
      <TabBarContent value="settings" class="p-2 text-sm">
        Project settings.
      </TabBarContent>
    </TabBar>

    <TabBar default-value="overview">
      <TabBarList class="w-full">
        <TabBarItem value="overview">
          <LayoutGrid aria-hidden="true" />
          Overview
        </TabBarItem>
        <TabBarItem value="activity">
          <CircleDot aria-hidden="true" />
          Activity
        </TabBarItem>
      </TabBarList>
      <TabBarContent value="overview" class="p-2 text-sm">
        Health, members and recent deploys.
      </TabBarContent>
      <TabBarContent value="activity" class="p-2 text-sm">
        Events from the last 24 hours.
      </TabBarContent>
    </TabBar>
  </div>
</template>
