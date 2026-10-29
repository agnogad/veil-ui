"use client";

import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface FormProps extends React.ComponentProps<"form"> {
  /** Skip native constraint validation and handle it yourself. */
  noValidate?: boolean;
}

function Form({ className, noValidate = true, ...props }: FormProps) {
  return (
    <form
      data-slot="form"
      noValidate={noValidate}
      className={cn("grid gap-6", className)}
      {...props}
    />
  );
}

interface FormSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

function FormSection({
  className,
  title,
  description,
  children,
  ...props
}: FormSectionProps) {
  return (
    <div data-slot="form-section" className={cn("grid gap-4", className)} {...props}>
      {title || description ? (
        <div className="grid gap-1">
          {title ? (
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          ) : null}
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function FormError({ className, children, ...props }: React.ComponentProps<"div">) {
  if (!children) return null;

  return (
    <div
      data-slot="form-error"
      role="alert"
      className={cn(
        "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Form, FormError, FormSection };
