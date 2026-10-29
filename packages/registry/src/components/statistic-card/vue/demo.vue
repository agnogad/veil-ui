<script setup lang="ts">
import { Users } from "lucide-vue-next";

import { StatisticCard } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <StatisticCard
      label="Active users"
      value="12,480"
      :delta="12.4"
      trend="up"
      :icon="Users"
    />
    <StatisticCard
      label="Churn rate"
      value="2.1%"
      :delta="-0.4"
      trend="down"
      delta-label="vs last quarter"
    />
  </div>
</template>
