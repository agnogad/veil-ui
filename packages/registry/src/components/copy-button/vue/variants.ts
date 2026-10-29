import { cva, type VariantProps } from "class-variance-authority";

export const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md outline-none transition-[color,background-color,border-color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20",
      },
      size: {
        sm: "size-8 [&_svg:not([class*='size-'])]:size-4",
        default: "size-9 [&_svg:not([class*='size-'])]:size-4",
        lg: "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
