<script setup lang="ts">
import { FormField, FormFieldLabel } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

import { FieldGroup, FieldGroupLegend, FieldGroupRow } from "./index";
</script>

<template>
  <FieldGroup class="w-full max-w-md">
    <FieldGroupLegend>Billing address</FieldGroupLegend>
    <FieldGroupRow>
      <FormField>
        <FormFieldLabel for="billing-first">First name</FormFieldLabel>
        <Input id="billing-first" autocomplete="given-name" />
      </FormField>
      <FormField>
        <FormFieldLabel for="billing-last">Last name</FormFieldLabel>
        <Input id="billing-last" autocomplete="family-name" />
      </FormField>
    </FieldGroupRow>
    <FormField>
      <FormFieldLabel for="billing-street">Street</FormFieldLabel>
      <Input id="billing-street" autocomplete="street-address" />
    </FormField>
  </FieldGroup>

  <FieldGroup class="mt-8 w-full max-w-sm" disabled>
    <FieldGroupLegend>Managed by your admin</FieldGroupLegend>
    <FormField>
      <FormFieldLabel for="locked-team">Team name</FormFieldLabel>
      <Input id="locked-team" model-value="Acme Engineering" disabled />
    </FormField>
  </FieldGroup>
</template>
