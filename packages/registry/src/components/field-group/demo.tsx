"use client";

import { FieldGroup, FieldGroupLegend, FieldGroupRow } from "./index";
import { FormField, FormFieldLabel } from "../form-field/index";
import { Input } from "../input/index";

export function FieldGroupBasic() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <FieldGroupLegend>Workspace</FieldGroupLegend>
      <FormField>
        <FormFieldLabel htmlFor="workspace-name">Name</FormFieldLabel>
        <Input id="workspace-name" placeholder="Acme" />
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="workspace-slug">Slug</FormFieldLabel>
        <Input id="workspace-slug" placeholder="acme" />
      </FormField>
    </FieldGroup>
  );
}

export function FieldGroupRows() {
  return (
    <FieldGroup className="w-full max-w-md">
      <FieldGroupLegend>Billing address</FieldGroupLegend>
      <FieldGroupRow>
        <FormField>
          <FormFieldLabel htmlFor="billing-first">First name</FormFieldLabel>
          <Input id="billing-first" autoComplete="given-name" />
        </FormField>
        <FormField>
          <FormFieldLabel htmlFor="billing-last">Last name</FormFieldLabel>
          <Input id="billing-last" autoComplete="family-name" />
        </FormField>
      </FieldGroupRow>
      <FormField>
        <FormFieldLabel htmlFor="billing-street">Street</FormFieldLabel>
        <Input id="billing-street" autoComplete="street-address" />
      </FormField>
    </FieldGroup>
  );
}

export function FieldGroupDisabled() {
  return (
    <FieldGroup className="w-full max-w-sm" disabled>
      <FieldGroupLegend>Managed by your admin</FieldGroupLegend>
      <FormField>
        <FormFieldLabel htmlFor="locked-name">Team name</FormFieldLabel>
        <Input id="locked-name" defaultValue="Acme Engineering" />
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="locked-plan">Plan</FormFieldLabel>
        <Input id="locked-plan" defaultValue="Enterprise" />
      </FormField>
    </FieldGroup>
  );
}
