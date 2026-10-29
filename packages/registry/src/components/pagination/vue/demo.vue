<script setup lang="ts">
import { ref } from "vue";

import { Pagination } from "./index";

const page = ref(5);
</script>

<template>
  <div class="grid gap-3">
    <Pagination
      :page="page"
      :total-pages="20"
      @update:page="page = $event"
    />
    <p class="text-xs text-muted-foreground">Page {{ page }} of 20</p>
    <Pagination :page="1" :total-pages="3" />
  </div>
</template>
