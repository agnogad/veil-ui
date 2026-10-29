<script setup lang="ts">
import { ref } from "vue";

import { PhoneInput } from "./index";

const phone = ref("");
const country = ref("GB");
</script>

<template>
  <div class="grid gap-6">
    <div class="flex flex-col gap-3">
      <PhoneInput v-model="phone" default-country="TR" />
      <p class="text-sm text-muted-foreground">
        {{ phone ? `Number: ${phone}` : "No number entered" }}
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <PhoneInput v-model:country="country" />
      <p class="text-sm text-muted-foreground">Country: {{ country }}</p>
    </div>

    <PhoneInput disabled default-value="555 0100" />
  </div>
</template>
