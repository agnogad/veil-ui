<script setup lang="ts">
import { InteractiveCard } from "./index";
</script>

<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <InteractiveCard class="p-5">
      <h3 class="text-sm font-medium">Team plan</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        Unlimited projects and 10 seats.
      </p>
    </InteractiveCard>
    <InteractiveCard disabled class="p-5">
      <h3 class="text-sm font-medium">Enterprise</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        Contact sales to unlock.
      </p>
    </InteractiveCard>
  </div>
</template>
