<script setup lang="ts">
import { StatusBadge } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <StatusBadge status="success">Active</StatusBadge>
    <StatusBadge status="warning">Trial ending</StatusBadge>
    <StatusBadge status="danger">Failed</StatusBadge>
    <StatusBadge status="info">In review</StatusBadge>
    <StatusBadge status="neutral">Draft</StatusBadge>
  </div>
</template>
