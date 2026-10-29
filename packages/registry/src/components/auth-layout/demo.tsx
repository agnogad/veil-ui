"use client";

import { AuthLayout } from "./index";
import { LoginForm } from "../login-form/index";

export function AuthLayoutBasic() {
  return (
    <AuthLayout
      className="w-full max-w-4xl"
      highlights={[
        "Accessible primitives out of the box",
        "Own the source in your repo",
        "Themes driven by design tokens",
      ]}
      footer="Protected by enterprise-grade security."
    >
      <LoginForm onSubmit={() => {}} />
    </AuthLayout>
  );
}

export function AuthLayoutMinimal() {
  return (
    <AuthLayout
      className="w-full max-w-3xl md:grid-cols-1"
      description="Welcome back."
    >
      <LoginForm
        title="Sign in"
        description="Use your workspace credentials."
        onSubmit={() => {}}
      />
    </AuthLayout>
  );
}
