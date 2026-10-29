<script setup lang="ts">
import { Inbox, Search } from "lucide-vue-next";

import { Button } from "@/components/ui/button";

import { EmptyState } from "./index";
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <EmptyState
      :icon="Inbox"
      title="No messages"
      description="Messages you receive will show up here."
    />
    <EmptyState
      :icon="Search"
      title="No projects yet"
      description="Create your first project to get started."
    >
      <template #action>
        <Button size="sm">New project</Button>
      </template>
    </EmptyState>
  </div>
</template>
