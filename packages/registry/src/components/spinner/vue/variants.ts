import { cva, type VariantProps } from "class-variance-authority";

export const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
