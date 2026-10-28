import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "size-6 text-[10px]",
        default: "size-8 text-xs",
        lg: "size-10 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Avatar({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size ?? "default"}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage, avatarVariants };
