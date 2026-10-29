"use client";

import { ResetPasswordForm } from "./index";

export function ResetPasswordFormBasic() {
  return (
    <ResetPasswordForm
      className="rounded-xl border bg-background p-6"
      onSubmit={() => {}}
    />
  );
}

export function ResetPasswordFormLoading() {
  return (
    <ResetPasswordForm
      className="rounded-xl border bg-background p-6"
      description="Pick something you have not used before."
      loading
      onSubmit={() => {}}
    />
  );
}
