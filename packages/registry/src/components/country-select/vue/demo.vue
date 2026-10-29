<script setup lang="ts">
import { ref } from "vue";

import { CountrySelect } from "./index";

const country = ref("TR");
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <CountrySelect v-model="country" />
      <p class="text-sm text-muted-foreground">
        Selected code: {{ country }}
      </p>
    </div>

    <CountrySelect label="Shipping country" default-value="DE" />

    <CountrySelect
      label="Calling code"
      display="dial"
      default-value="US"
      class="w-28"
    />
  </div>
</template>
