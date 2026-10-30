<script setup lang="ts">
import { MessageSquare, Rocket } from "lucide-vue-next";

import { ActivityFeed } from "./index";
</script>

<template>
  <ActivityFeed
    class="max-w-md"
    :items="[
      {
        id: '1',
        actor: 'Mira Chen',
        action: 'merged',
        target: 'feat/registry-sync',
        time: '2 minutes ago',
        icon: Rocket,
      },
      {
        id: '2',
        actor: 'Owen Park',
        action: 'commented on',
        target: '#128',
        time: '18 minutes ago',
        icon: MessageSquare,
      },
      {
        id: '3',
        actor: 'Lena Ortiz',
        action: 'approved the release',
        time: '1 hour ago',
      },
    ]"
  />
</template>
