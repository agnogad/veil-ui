import type * as React from "react";

import { cn } from "@veil-ui/utils";

const sidebarWidths = {
  sm: "lg:grid-cols-[220px_1fr]",
  md: "lg:grid-cols-[280px_1fr]",
  lg: "lg:grid-cols-[340px_1fr]",
} as const;

interface AppShellProps extends React.ComponentProps<"div"> {
  /** Persistent sidebar; hidden below the large breakpoint. */
  sidebar?: React.ReactNode;
  /** Sticky top bar spanning the full width. */
  header?: React.ReactNode;
  sidebarWidth?: keyof typeof sidebarWidths;
}

function AppShell({
  className,
  sidebar,
  header,
  sidebarWidth = "md",
  children,
  ...props
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn(
        "grid min-h-dvh grid-rows-[auto_1fr] bg-background",
        className,
      )}
      {...props}
    >
      {header ? (
        <header
          data-slot="app-shell-header"
          className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur"
        >
          {header}
        </header>
      ) : null}
      <div
        className={cn("grid min-h-0", sidebar && sidebarWidths[sidebarWidth])}
      >
        {sidebar ? (
          <aside
            data-slot="app-shell-sidebar"
            className="hidden min-h-0 overflow-y-auto border-r bg-muted/20 lg:block"
          >
            {sidebar}
          </aside>
        ) : null}
        <main
          data-slot="app-shell-main"
          className="min-w-0 overflow-x-hidden"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export { AppShell };
