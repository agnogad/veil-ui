<script setup lang="ts">
import { ConnectionStatus } from "./index";
</script>

<template>
  <div class="flex flex-col gap-3">
    <ConnectionStatus />
    <ConnectionStatus status="connecting" />
    <ConnectionStatus status="reconnecting" />
    <ConnectionStatus status="offline" />
    <ConnectionStatus status="online" label="Sync active" />
  </div>
</template>
