"use client";

import { SignupForm } from "./index";

export function SignupFormBasic() {
  return (
    <SignupForm
      className="rounded-xl border bg-background p-6"
      onSubmit={() => {}}
    />
  );
}

export function SignupFormWithError() {
  return (
    <SignupForm
      className="rounded-xl border bg-background p-6"
      error="An account with this email already exists."
      onSubmit={() => {}}
    />
  );
}
