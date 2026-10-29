<script setup lang="ts">
import { GitPullRequest, MessageSquare } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import { Notification } from "./index";

const visible = ref(true);
</script>

<template>
  <div class="grid max-w-lg gap-3">
    <Notification
      title="Deployment finished"
      description="Production is running commit 4f2a91c."
      timestamp="2 minutes ago"
      :icon="GitPullRequest"
    />
    <Notification
      title="New comment on your review"
      description="Ada left feedback on the spacing tokens."
      timestamp="10 minutes ago"
      unread
      :icon="MessageSquare"
    >
      <template #action>
        <div class="flex gap-2">
          <Button size="sm">Reply</Button>
          <Button size="sm" variant="outline">Open thread</Button>
        </div>
      </template>
    </Notification>
    <Notification
      v-if="visible"
      title="Usage report is ready"
      description="Your monthly report can be downloaded."
      timestamp="Yesterday"
      :icon="MessageSquare"
      @dismiss="visible = false"
    />
    <Button v-else variant="outline" size="sm" @click="visible = true">
      Restore notification
    </Button>
  </div>
</template>
