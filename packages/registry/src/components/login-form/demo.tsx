"use client";

import { LoginForm } from "./index";

export function LoginFormBasic() {
  return (
    <LoginForm
      className="rounded-xl border bg-background p-6"
      onSubmit={() => {}}
    />
  );
}

export function LoginFormWithError() {
  return (
    <LoginForm
      className="rounded-xl border bg-background p-6"
      error="Invalid email or password."
      loading
      onSubmit={() => {}}
    />
  );
}
