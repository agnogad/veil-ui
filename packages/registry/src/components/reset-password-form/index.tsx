"use client";

import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";

interface ResetPasswordFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onSubmit?: (password: string) => void;
  loading?: boolean;
  loginHref?: string;
}

function ResetPasswordForm({
  className,
  title = "Choose a new password",
  description = "Your new password must be at least 8 characters.",
  onSubmit,
  loading = false,
  loginHref = "#login",
  ...props
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      data-slot="reset-password-form"
      className={cn("grid w-full max-w-sm gap-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (password.length < 8) {
          setError("Use at least 8 characters.");
          return;
        }
        if (password !== confirm) {
          setError("Passwords do not match.");
          return;
        }
        setError(null);
        onSubmit?.(password);
      }}
      {...props}
    >
      <div className="grid gap-1.5">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="reset-password">New password</Label>
        <Input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reset-confirm">Confirm password</Label>
        <Input
          id="reset-confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Updating…" : "Update password"}
      </Button>
      <a
        href={loginHref}
        className="text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Back to sign in
      </a>
    </form>
  );
}

export { ResetPasswordForm };
export type { ResetPasswordFormProps };
