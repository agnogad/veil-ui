import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "size"> {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  strokeWidth?: number;
  /** When set, the icon is exposed as an image with this name. */
  label?: string;
}

function Icon({
  icon: IconComponent,
  size = "md",
  strokeWidth = 2,
  label,
  className,
  ...props
}: IconProps) {
  return (
    <IconComponent
      data-slot="icon"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      strokeWidth={strokeWidth}
      className={cn(sizes[size], className)}
      {...props}
    />
  );
}

export { Icon };
export type { IconProps };
