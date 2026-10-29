<script setup lang="ts">
import { ref } from "vue";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ExpandableSection } from "./index";

const open = ref(false);
const retries = ref("3");
const timeout = ref("5000");
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <ExpandableSection
      title="Advanced settings"
      description="Retries, timeouts and cache behaviour."
    >
      <div class="grid gap-3">
        <div class="grid gap-1.5">
          <Label for="expandable-retries">Max retries</Label>
          <Input
            id="expandable-retries"
            v-model="retries"
            inputmode="numeric"
          />
        </div>
        <div class="grid gap-1.5">
          <Label for="expandable-timeout">Timeout (ms)</Label>
          <Input
            id="expandable-timeout"
            v-model="timeout"
            inputmode="numeric"
          />
        </div>
      </div>
    </ExpandableSection>

    <ExpandableSection
      title="Billing address"
      description="Used on every invoice."
      default-open
    >
      <p>221B Baker Street, London, NW1 6XE, United Kingdom</p>
    </ExpandableSection>

    <ExpandableSection
      v-model:open="open"
      title="Locked section"
      description="Upgrade your plan to edit these settings."
      disabled
    >
      <p>Read-only content.</p>
    </ExpandableSection>
  </div>
</template>
