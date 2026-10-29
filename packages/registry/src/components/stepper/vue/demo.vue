<script setup lang="ts">
import { Stepper, type StepperStep } from "./index";

const steps: StepperStep[] = [
  { title: "Account", description: "Email and password" },
  { title: "Workspace", description: "Name and region" },
  { title: "Done", description: "Invite the team" },
];
</script>

<template>
  <div class="grid gap-8">
    <Stepper :steps="steps" :current="2" class="max-w-xl" />
    <Stepper
      :steps="steps"
      :current="1"
      orientation="vertical"
      class="max-w-xs"
    />
  </div>
</template>
