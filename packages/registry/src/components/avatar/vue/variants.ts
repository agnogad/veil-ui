import { cva, type VariantProps } from "class-variance-authority";

export const avatarVariants = cva(
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

export type AvatarVariants = VariantProps<typeof avatarVariants>;
