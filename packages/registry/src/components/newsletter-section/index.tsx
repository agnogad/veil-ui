"use client";

import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";

interface NewsletterSectionProps
  extends Omit<React.ComponentProps<"div">, "title" | "onSubmit"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: React.ReactNode;
  onSubmit?: (email: string) => void;
}

function NewsletterSection({
  className,
  title = "Stay in the loop",
  description = "Product updates and new components, once a month.",
  placeholder = "you@example.com",
  buttonLabel = "Subscribe",
  successMessage = "Thanks — check your inbox to confirm.",
  onSubmit,
  ...props
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div
      data-slot="newsletter-section"
      className={cn(
        "rounded-xl border bg-muted/20 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {subscribed ? (
        <p className="mt-6 text-sm font-medium text-primary" role="status">
          {successMessage}
        </p>
      ) : (
        <form
          className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (!email) return;
            onSubmit?.(email);
            setSubscribed(true);
          }}
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            className="flex-1"
          />
          <Button type="submit">{buttonLabel}</Button>
        </form>
      )}
    </div>
  );
}

export { NewsletterSection };
export type { NewsletterSectionProps };
