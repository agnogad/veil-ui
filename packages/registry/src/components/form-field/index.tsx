"use client";

import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Label } from "../label/index";

function FormField({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function FormFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="form-field-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function FormFieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function FormFieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) return null;

  return (
    <p
      data-slot="form-field-error"
      role="alert"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function FormFieldControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
  return (
    <Slot
      data-slot="form-field-control"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel,
};
