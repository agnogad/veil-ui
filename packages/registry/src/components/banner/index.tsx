"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { IconButton } from "../icon-button/index";

const bannerVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        muted: "bg-muted/50 text-foreground",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive [&_[data-slot=banner-description]]:text-destructive/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BannerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bannerVariants> {}

function Banner({
  className,
  variant,
  role = "status",
  ...props
}: BannerProps) {
  return (
    <div
      data-slot="banner"
      data-variant={variant ?? "default"}
      role={role}
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    />
  );
}

function BannerIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-icon"
      className={cn("mt-0.5 shrink-0 [&_svg]:size-4", className)}
      {...props}
    />
  );
}

function BannerContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-content"
      className={cn("grid flex-1 gap-1", className)}
      {...props}
    />
  );
}

function BannerTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="banner-title"
      className={cn("font-medium leading-none", className)}
      {...props}
    />
  );
}

function BannerDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="banner-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function BannerActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-actions"
      className={cn("mt-2 flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

function BannerClose({
  className,
  label = "Dismiss banner",
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "aria-label"> & {
  /** Accessible name for the dismiss control. */
  label?: string;
}) {
  return (
    <IconButton
      data-slot="banner-close"
      variant="ghost"
      size="sm"
      aria-label={label}
      className={cn("-mr-1 -mt-1", className)}
      {...props}
    >
      <X />
    </IconButton>
  );
}

export {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
  bannerVariants,
};
