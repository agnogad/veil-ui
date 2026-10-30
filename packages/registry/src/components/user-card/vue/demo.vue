<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { UserCard } from "./index";
</script>

<template>
  <UserCard
    name="Ada Lovelace"
    handle="ada"
    bio="Design engineer building accessible interfaces."
    :stats="[
      { label: 'projects', value: 12 },
      { label: 'followers', value: '1.2k' },
    ]"
    class="mx-auto"
  >
    <template #action>
      <Button size="sm" variant="outline">Follow</Button>
    </template>
  </UserCard>
</template>
