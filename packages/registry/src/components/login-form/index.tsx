"use client";

import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";

interface LoginFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onSubmit?: (values: { email: string; password: string }) => void;
  error?: React.ReactNode;
  loading?: boolean;
  forgotHref?: string;
  signupHref?: string;
}

function LoginForm({
  className,
  title = "Welcome back",
  description = "Sign in to continue to your workspace.",
  onSubmit,
  error,
  loading = false,
  forgotHref = "#forgot-password",
  signupHref = "#signup",
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      data-slot="login-form"
      className={cn("grid w-full max-w-sm gap-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.({ email, password });
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
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="login-password">Password</Label>
          <a
            href={forgotHref}
            className="text-xs text-primary underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <a
          href={signupHref}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </a>
      </p>
    </form>
  );
}

export { LoginForm };
export type { LoginFormProps };
