<script setup lang="ts">
import { AvatarGroup } from "./index";

const team = [
  { name: "Ada Lovelace" },
  { name: "Grace Hopper" },
  { name: "Alan Turing" },
  { name: "Katherine Johnson" },
  { name: "Linus Torvalds" },
  { name: "Margaret Hamilton" },
];
</script>

<template>
  <div class="grid gap-6">
    <AvatarGroup :users="team" />
    <AvatarGroup :users="team" size="sm" :max="3" label="Reviewers" />
    <AvatarGroup :users="team.slice(0, 3)" size="lg" />
  </div>
</template>
