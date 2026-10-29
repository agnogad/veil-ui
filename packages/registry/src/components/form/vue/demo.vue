<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Form, FormError, FormSection } from "./index";

const name = ref("");
const email = ref("");
const error = ref<string | null>(null);
const saved = ref(false);

function submit() {
  saved.value = false;
  if (!name.value.trim()) {
    error.value = "Enter your name before saving.";
    return;
  }
  if (!email.value.includes("@")) {
    error.value = "Enter a valid email address.";
    return;
  }
  error.value = null;
  saved.value = true;
}
</script>

<template>
  <Form class="w-full max-w-sm" @submit.prevent="submit">
    <FormError v-if="error">{{ error }}</FormError>

    <FormSection
      title="Profile"
      description="How your account appears to teammates."
    >
      <div data-slot="form-field" class="grid gap-2">
        <label
          for="form-name"
          data-slot="form-field-label"
          class="flex select-none items-center gap-2 text-sm font-medium leading-none"
        >
          Name
        </label>
        <Input id="form-name" v-model="name" placeholder="Ada Lovelace" />
      </div>
      <div data-slot="form-field" class="grid gap-2">
        <label
          for="form-email"
          data-slot="form-field-label"
          class="flex select-none items-center gap-2 text-sm font-medium leading-none"
        >
          Email
        </label>
        <Input
          id="form-email"
          v-model="email"
          type="email"
          placeholder="ada@example.com"
          :aria-invalid="error ? true : undefined"
        />
      </div>
    </FormSection>

    <FormSection
      title="Notifications"
      description="Choose what lands in your inbox."
    >
      <label class="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          class="size-4 rounded-sm border border-input accent-primary"
          checked
        />
        Weekly product digest
      </label>
    </FormSection>

    <div class="flex items-center gap-3">
      <Button type="submit" class="w-fit">Save changes</Button>
      <span v-if="saved" class="text-sm text-muted-foreground">
        Profile saved.
      </span>
    </div>
  </Form>
</template>
