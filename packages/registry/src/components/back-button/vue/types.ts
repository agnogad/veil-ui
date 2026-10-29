import type { ButtonVariants } from "@/components/ui/button";

export interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
  onClick?: () => void;
  showIcon?: boolean;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: string;
}
