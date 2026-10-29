"use client";

import { ForgotPasswordForm } from "./index";

export function ForgotPasswordFormBasic() {
  return (
    <ForgotPasswordForm
      className="rounded-xl border bg-background p-6"
      onSubmit={() => {}}
    />
  );
}

export function ForgotPasswordFormCustom() {
  return (
    <ForgotPasswordForm
      className="rounded-xl border bg-background p-6"
      description="We will email a secure link that expires in 30 minutes."
      successMessage="Check your inbox — the link expires in 30 minutes."
      onSubmit={() => {}}
    />
  );
}
