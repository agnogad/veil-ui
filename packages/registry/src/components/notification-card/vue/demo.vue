<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { NotificationCard } from "./index";
</script>

<template>
  <div class="grid max-w-md gap-3">
    <NotificationCard
      title="New comment on your pull request"
      description="Mira left feedback on the token refactor."
      time="5 minutes ago"
    />
    <NotificationCard
      type="success"
      title="Deployment succeeded"
      description="api@2.4.0 is live in eu-central-1."
      time="Just now"
      unread
    />
    <NotificationCard
      type="warning"
      title="Usage at 80%"
      description="You are approaching the monthly request limit."
      time="2 hours ago"
    >
      <template #actions>
        <Button variant="ghost" size="sm">View usage</Button>
      </template>
    </NotificationCard>
  </div>
</template>
