<script setup lang="ts">
import { AccountSettings } from "./index";
</script>

<template>
  <div class="grid w-full max-w-2xl gap-6">
    <AccountSettings class="w-full rounded-xl border bg-background p-5" />
    <AccountSettings
      class="w-full rounded-xl border bg-background p-5"
      default-section="security"
    />
  </div>
</template>
