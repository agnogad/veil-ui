<script setup lang="ts">
import { PricingCard } from "./index";
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <PricingCard
      name="Starter"
      price="$0"
      description="For side projects."
      :features="['3 projects', 'Community support']"
      class="mx-auto"
    />
    <PricingCard
      name="Team"
      price="$24"
      description="For growing teams."
      :features="['Unlimited projects', '10 seats', 'Priority support']"
      highlighted
      badge="Most popular"
      class="mx-auto"
    />
  </div>
</template>
