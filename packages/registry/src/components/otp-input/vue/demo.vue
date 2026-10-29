<script setup lang="ts">
import { ref } from "vue";

import { OtpInput } from "./index";

const code = ref("");
const complete = ref(false);
</script>

<template>
  <div class="grid gap-6">
    <div class="flex flex-col gap-3">
      <OtpInput
        v-model="code"
        label="Verification code"
        @complete="complete = true"
      />
      <p class="text-sm text-muted-foreground">
        {{
          complete
            ? "Code complete"
            : `Entered ${code.replaceAll(" ", "").length} of 6 digits`
        }}
      </p>
    </div>

    <OtpInput :length="4" label="PIN" default-value="12" />

    <OtpInput disabled default-value="482013" label="Locked code" />
  </div>
</template>
