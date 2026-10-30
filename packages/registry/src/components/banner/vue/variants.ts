import { cva, type VariantProps } from "class-variance-authority";

export const bannerVariants = cva(
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

export type BannerVariants = VariantProps<typeof bannerVariants>;
