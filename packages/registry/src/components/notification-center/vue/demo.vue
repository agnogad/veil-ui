<script setup lang="ts">
import { GitPullRequest, MessageSquare } from "lucide-vue-next";
import { ref } from "vue";

import { NotificationCenter } from "./index";
import type { NotificationCenterItem } from "./types";

const items = ref<NotificationCenterItem[]>([
  {
    id: "1",
    title: "Deployment finished",
    description: "Production is running commit 4f2a91c.",
    timestamp: "2 minutes ago",
    unread: true,
    icon: GitPullRequest,
  },
  {
    id: "2",
    title: "New comment on your review",
    description: "Ada left feedback on the spacing tokens.",
    timestamp: "10 minutes ago",
    icon: MessageSquare,
  },
]);
</script>

<template>
  <div class="flex items-center gap-4">
    <NotificationCenter :notifications="items" />
    <NotificationCenter :notifications="[]" />
  </div>
</template>
