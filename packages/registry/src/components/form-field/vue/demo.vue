<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel,
} from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <FormField id="field-name" required>
      <FormFieldLabel>Name</FormFieldLabel>
      <FormFieldControl>
        <Input placeholder="Ada Lovelace" />
      </FormFieldControl>
    </FormField>

    <FormField id="field-bio" optional>
      <FormFieldLabel>Bio</FormFieldLabel>
      <FormFieldControl>
        <Textarea placeholder="A short introduction" :rows="3" />
      </FormFieldControl>
      <FormFieldDescription>
        Shown on your public profile. Markdown is supported.
      </FormFieldDescription>
    </FormField>

    <FormField id="field-email" invalid>
      <FormFieldLabel>Email</FormFieldLabel>
      <FormFieldControl>
        <Input type="email" model-value="not-an-email" />
      </FormFieldControl>
      <FormFieldError>Enter a valid email address.</FormFieldError>
    </FormField>
  </div>
</template>
