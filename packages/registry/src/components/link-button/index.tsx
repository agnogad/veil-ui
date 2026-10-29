import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const linkButtonVariants = cva(
  "inline-flex items-center gap-1 rounded-sm text-sm outline-none underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "font-medium text-foreground hover:underline",
        muted: "text-muted-foreground hover:text-foreground hover:underline",
        destructive: "font-medium text-destructive hover:underline",
      },
      underline: {
        true: "underline",
        false: "no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: false,
    },
  },
);

interface LinkButtonProps
  extends React.ComponentProps<"a">,
    VariantProps<typeof linkButtonVariants> {
  asChild?: boolean;
  /** Adds target, rel and an external-link indicator. */
  external?: boolean;
}

function LinkButton({
  className,
  variant,
  underline,
  asChild = false,
  external = false,
  children,
  ...props
}: LinkButtonProps) {
  const Comp = asChild ? Slot : "a";
  const externalProps = external
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};

  return (
    <Comp
      data-slot="link-button"
      className={cn(linkButtonVariants({ variant, underline }), className)}
      {...externalProps}
      {...props}
    >
      {children}
      {external && !asChild ? (
        <>
          <ArrowUpRight aria-hidden className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : null}
    </Comp>
  );
}

export { LinkButton, linkButtonVariants };
