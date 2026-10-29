<script setup lang="ts">
import { KeyValueList } from "./index";
</script>

<template>
  <div class="grid max-w-xl gap-8">
    <KeyValueList
      class="max-w-sm"
      :items="[
        { label: 'Workspace', value: 'Northwind' },
        { label: 'Plan', value: 'Team' },
        { label: 'Region', value: 'eu-central-1' },
        {
          label: 'API key',
          value: 'sk_live_••••42',
          copyValue: 'sk_live_demo_key_42',
        },
      ]"
    />
    <KeyValueList
      :columns="2"
      :items="[
        { label: 'Owner', value: 'Ada Lovelace' },
        { label: 'Created', value: 'Mar 2, 2026' },
        { label: 'Status', value: 'Active' },
        { label: 'Seats', value: '12 of 20' },
      ]"
    />
  </div>
</template>
