import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface FullScreenLayoutProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  /** Center the main content on both axes. */
  centered?: boolean;
  padded?: boolean;
}

function FullScreenLayout({
  className,
  header,
  footer,
  centered = false,
  padded = false,
  children,
  ...props
}: FullScreenLayoutProps) {
  return (
    <div
      data-slot="full-screen-layout"
      className={cn("flex min-h-dvh flex-col bg-background", className)}
      {...props}
    >
      {header ? (
        <header data-slot="full-screen-layout-header" className="border-b">
          <div className="px-4 py-3 sm:px-6">{header}</div>
        </header>
      ) : null}
      <main
        data-slot="full-screen-layout-main"
        className={cn(
          "flex flex-1 flex-col",
          centered && "items-center justify-center",
          padded && "p-4 sm:p-6",
        )}
      >
        {children}
      </main>
      {footer ? (
        <footer data-slot="full-screen-layout-footer" className="border-t">
          <div className="px-4 py-3 sm:px-6">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}

export { FullScreenLayout };
