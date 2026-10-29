"use client";

import { ArrowLeft } from "lucide-react";

import { Button, type ButtonProps } from "../button/index";
import { cn } from "@veil-ui/utils";

interface BackButtonProps
  extends Omit<ButtonProps, "onClick" | "children"> {
  label?: string;
  fallbackHref?: string;
  onClick?: () => void;
  showIcon?: boolean;
}

function BackButton({
  label = "Back",
  fallbackHref,
  onClick,
  showIcon = true,
  variant = "ghost",
  size = "sm",
  className,
  ...props
}: BackButtonProps) {
  function handleClick() {
    if (onClick) {
      onClick();
      return;
    }
    if (fallbackHref) {
      window.location.href = fallbackHref;
      return;
    }
    window.history.back();
  }

  return (
    <Button
      data-slot="back-button"
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn("gap-1.5", className)}
      {...props}
    >
      {showIcon ? <ArrowLeft aria-hidden /> : null}
      {label}
    </Button>
  );
}

export { BackButton };
export type { BackButtonProps };
