import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
} as const;

interface PageShellProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  size?: keyof typeof sizes;
}

function PageShell({
  className,
  header,
  footer,
  size = "lg",
  children,
  ...props
}: PageShellProps) {
  const gutter = "mx-auto w-full px-4 sm:px-6";

  return (
    <div
      data-slot="page-shell"
      className={cn("flex min-h-dvh flex-col", className)}
      {...props}
    >
      {header ? (
        <header data-slot="page-shell-header" className="border-b">
          <div className={cn(gutter, sizes[size])}>{header}</div>
        </header>
      ) : null}
      <main data-slot="page-shell-main" className="flex-1">
        <div className={cn(gutter, "py-8", sizes[size])}>{children}</div>
      </main>
      {footer ? (
        <footer data-slot="page-shell-footer" className="border-t">
          <div className={cn(gutter, "py-6", sizes[size])}>{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}

export { PageShell };
