"use client";

import { Input } from "../input/index";
import { Textarea } from "../textarea/index";
import {
  FormField,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel,
} from "./index";

export function FormFieldBasic() {
  return (
    <FormField className="w-full max-w-sm">
      <FormFieldLabel htmlFor="field-name">Name</FormFieldLabel>
      <Input id="field-name" placeholder="Ada Lovelace" />
    </FormField>
  );
}

export function FormFieldWithDescription() {
  return (
    <FormField className="w-full max-w-sm">
      <FormFieldLabel htmlFor="field-bio">Bio</FormFieldLabel>
      <Textarea id="field-bio" placeholder="A short introduction" rows={3} />
      <FormFieldDescription>
        Shown on your public profile. Markdown is supported.
      </FormFieldDescription>
    </FormField>
  );
}

export function FormFieldWithError() {
  return (
    <FormField className="w-full max-w-sm">
      <FormFieldLabel htmlFor="field-email">Email</FormFieldLabel>
      <Input
        id="field-email"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="field-email-error"
      />
      <FormFieldError id="field-email-error">
        Enter a valid email address.
      </FormFieldError>
    </FormField>
  );
}
