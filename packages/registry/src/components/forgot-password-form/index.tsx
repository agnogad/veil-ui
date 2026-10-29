"use client";

import { ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";

interface ForgotPasswordFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  successMessage?: React.ReactNode;
  onSubmit?: (email: string) => void;
  backHref?: string;
  loading?: boolean;
}

function ForgotPasswordForm({
  className,
  title = "Forgot your password?",
  description = "Enter your email and we will send a reset link.",
  successMessage = "If an account exists for that email, a reset link is on its way.",
  onSubmit,
  backHref = "#login",
  loading = false,
  ...props
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      data-slot="forgot-password-form"
      className={cn("grid w-full max-w-sm gap-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(email);
        setSent(true);
      }}
      {...props}
    >
      <div className="grid gap-1.5">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {sent ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-3 text-sm"
        >
          <MailCheck className="mt-0.5 size-4 text-primary" aria-hidden />
          <p className="text-muted-foreground">{successMessage}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-2">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </>
      )}
      <a
        href={backHref}
        className="inline-flex items-center justify-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> Back to sign in
      </a>
    </form>
  );
}

export { ForgotPasswordForm };
export type { ForgotPasswordFormProps };
