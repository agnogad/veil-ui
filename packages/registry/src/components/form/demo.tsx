"use client";

import { Button } from "../button/index";
import { FormField, FormFieldLabel } from "../form-field/index";
import { Input } from "../input/index";
import { Form, FormError, FormSection } from "./index";

export function FormBasic() {
  return (
    <Form className="w-full max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <FormField>
        <FormFieldLabel htmlFor="form-email">Email</FormFieldLabel>
        <Input id="form-email" type="email" placeholder="you@example.com" />
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="form-password">Password</FormFieldLabel>
        <Input id="form-password" type="password" />
      </FormField>
      <Button type="submit">Sign in</Button>
    </Form>
  );
}

export function FormSections() {
  return (
    <Form className="w-full max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <FormSection
        title="Profile"
        description="How your account appears to teammates."
      >
        <FormField>
          <FormFieldLabel htmlFor="profile-name">Name</FormFieldLabel>
          <Input id="profile-name" placeholder="Ada Lovelace" />
        </FormField>
        <FormField>
          <FormFieldLabel htmlFor="profile-handle">Handle</FormFieldLabel>
          <Input id="profile-handle" placeholder="ada" />
        </FormField>
      </FormSection>
      <FormSection
        title="Notifications"
        description="Choose what lands in your inbox."
      >
        <FormField>
          <FormFieldLabel htmlFor="profile-email">Email</FormFieldLabel>
          <Input id="profile-email" type="email" placeholder="ada@example.com" />
        </FormField>
      </FormSection>
      <Button type="submit" className="w-fit">
        Save changes
      </Button>
    </Form>
  );
}

export function FormWithError() {
  return (
    <Form className="w-full max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <FormError>Check the highlighted fields and try again.</FormError>
      <FormField>
        <FormFieldLabel htmlFor="error-email">Email</FormFieldLabel>
        <Input id="error-email" type="email" aria-invalid />
      </FormField>
      <Button type="submit" className="w-fit">
        Continue
      </Button>
    </Form>
  );
}
