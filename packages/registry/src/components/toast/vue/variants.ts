import { cva, type VariantProps } from "class-variance-authority";

export const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 pr-10 text-sm shadow-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>["variant"]
>;
