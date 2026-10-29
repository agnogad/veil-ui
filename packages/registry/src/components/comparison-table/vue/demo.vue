<script setup lang="ts">
import { ComparisonTable } from "./index";
</script>

<template>
  <div class="grid gap-8">
    <ComparisonTable
      class="max-w-2xl"
      :plans="[
        { name: 'Starter', price: '$0' },
        { name: 'Team', price: '$24' },
        { name: 'Enterprise', price: 'Custom' },
      ]"
      :rows="[
        { feature: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
        { feature: 'SSO', values: [false, false, true] },
        { feature: 'Audit log', values: [false, true, true] },
        { feature: 'Priority support', values: [false, true, true] },
      ]"
    />
    <ComparisonTable
      class="max-w-xl"
      caption="Plan comparison"
      :plans="[{ name: 'Monthly' }, { name: 'Yearly' }]"
      :rows="[
        { feature: 'Billing', values: ['Monthly', 'Annual'] },
        { feature: 'Discount', values: [false, true] },
      ]"
    />
  </div>
</template>
