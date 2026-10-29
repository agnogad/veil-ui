<script setup lang="ts">
import { Check, Rocket, ShieldCheck } from "lucide-vue-next";

import { Timeline } from "./index";
</script>

<template>
  <div class="grid max-w-md gap-8">
    <Timeline
      :items="[
        {
          title: 'Order placed',
          description: 'We received your order and reserved the items.',
          time: '09:12',
          icon: Check,
          status: 'success',
        },
        {
          title: 'Preparing shipment',
          description: 'Your package is being packed.',
          time: '11:40',
          icon: Rocket,
        },
        {
          title: 'Out for delivery',
          time: 'Tomorrow',
          icon: ShieldCheck,
        },
      ]"
    />
    <Timeline
      :items="[
        { title: 'Draft created', time: 'Mon' },
        { title: 'Review requested', time: 'Tue' },
        { title: 'Published', time: 'Wed', status: 'success' },
      ]"
    />
  </div>
</template>
