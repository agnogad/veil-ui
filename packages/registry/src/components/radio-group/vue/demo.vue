<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "./index";

const billing = ref("monthly");
</script>

<template>
  <div class="grid gap-6">
    <div class="grid gap-2">
      <RadioGroup v-model="billing" aria-label="Billing period">
        <div class="flex items-center gap-2">
          <RadioGroupItem id="billing-monthly" value="monthly" />
          <Label for="billing-monthly">Monthly</Label>
        </div>
        <div class="flex items-center gap-2">
          <RadioGroupItem id="billing-yearly" value="yearly" />
          <Label for="billing-yearly">Yearly</Label>
        </div>
      </RadioGroup>
      <p class="text-sm text-muted-foreground">Selected: {{ billing }}</p>
    </div>

    <RadioGroup default-value="standard" aria-label="Plan">
      <div class="flex items-start gap-2">
        <RadioGroupItem id="plan-standard" value="standard" class="mt-1" />
        <div class="grid gap-0.5">
          <Label for="plan-standard">Standard</Label>
          <p class="text-sm text-muted-foreground">
            For individuals and small teams.
          </p>
        </div>
      </div>
      <div class="flex items-start gap-2">
        <RadioGroupItem id="plan-enterprise" value="enterprise" class="mt-1" />
        <div class="grid gap-0.5">
          <Label for="plan-enterprise">Enterprise</Label>
          <p class="text-sm text-muted-foreground">
            SSO, audit logs and dedicated support.
          </p>
        </div>
      </div>
    </RadioGroup>
  </div>
</template>
