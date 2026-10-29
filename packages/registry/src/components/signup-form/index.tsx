"use client";

import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Checkbox } from "../checkbox/index";
import { Input } from "../input/index";
import { Label } from "../label/index";

interface SignupFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onSubmit?: (values: {
    name: string;
    email: string;
    password: string;
  }) => void;
  error?: React.ReactNode;
  loading?: boolean;
  loginHref?: string;
}

function SignupForm({
  className,
  title = "Create your account",
  description = "Start free. No credit card required.",
  onSubmit,
  error,
  loading = false,
  loginHref = "#login",
  ...props
}: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <form
      data-slot="signup-form"
      className={cn("grid w-full max-w-sm gap-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.({ name, email, password });
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
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ada Lovelace"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          At least 8 characters with one number.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <Checkbox
          id="signup-terms"
          checked={accepted}
          onCheckedChange={(value) => setAccepted(value === true)}
          className="mt-0.5"
          required
        />
        <Label htmlFor="signup-terms" className="text-sm font-normal">
          I agree to the terms of service and privacy policy.
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a
          href={loginHref}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}

export { SignupForm };
export type { SignupFormProps };
