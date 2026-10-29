import { cva, type VariantProps } from "class-variance-authority";

export const linkButtonVariants = cva(
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

export type LinkButtonVariants = VariantProps<typeof linkButtonVariants>;

export interface LinkButtonProps extends LinkButtonVariants {
  /** Render the single child element instead of an `<a>`. */
  asChild?: boolean;
  /** Adds target, rel and an external-link indicator. */
  external?: boolean;
  class?: string;
}
