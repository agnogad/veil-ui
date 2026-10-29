"use client";

import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button, type ButtonProps } from "../button/index";

interface SocialButtonProps extends ButtonProps {
  /** Provider mark rendered before the label. */
  icon?: React.ReactNode;
}

function SocialButton({
  icon,
  children,
  className,
  variant = "outline",
  ...props
}: SocialButtonProps) {
  return (
    <Button
      data-slot="social-button"
      variant={variant}
      className={cn("w-full gap-2", className)}
      {...props}
    >
      {icon ? (
        <span
          data-slot="social-button-icon"
          className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4"
        >
          {icon}
        </span>
      ) : null}
      {children}
    </Button>
  );
}

function SocialButtonGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="social-button-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

export { SocialButton, SocialButtonGroup };
