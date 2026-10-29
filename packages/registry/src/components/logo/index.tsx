import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  sm: { root: "gap-1.5", mark: "size-6", name: "text-sm" },
  md: { root: "gap-2", mark: "size-8", name: "text-base" },
  lg: { root: "gap-2.5", mark: "size-10", name: "text-lg" },
} as const;

interface LogoProps extends React.ComponentProps<"div"> {
  name: string;
  mark?: React.ReactNode;
  size?: keyof typeof sizes;
  href?: string;
}

function Logo({
  name,
  mark,
  size = "md",
  href,
  className,
  ...props
}: LogoProps) {
  const content = (
    <div
      data-slot="logo"
      className={cn("inline-flex items-center", sizes[size].root, className)}
      {...props}
    >
      {mark ? (
        <span
          data-slot="logo-mark"
          className={cn(
            "flex shrink-0 items-center justify-center overflow-hidden rounded-md",
            sizes[size].mark,
          )}
        >
          {mark}
        </span>
      ) : null}
      <span
        data-slot="logo-name"
        className={cn(
          "font-semibold tracking-tight",
          sizes[size].name,
        )}
      >
        {name}
      </span>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {content}
    </a>
  );
}

export { Logo };
export type { LogoProps };
