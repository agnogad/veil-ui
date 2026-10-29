import type * as React from "react";

import { cn } from "@veil-ui/utils";

const columns = {
  start: {
    sm: "lg:grid-cols-[220px_1fr]",
    md: "lg:grid-cols-[260px_1fr]",
    lg: "lg:grid-cols-[300px_1fr]",
  },
  end: {
    sm: "lg:grid-cols-[1fr_220px]",
    md: "lg:grid-cols-[1fr_260px]",
    lg: "lg:grid-cols-[1fr_300px]",
  },
} as const;

interface SidebarLayoutProps extends React.ComponentProps<"div"> {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarPosition?: "start" | "end";
  sidebarSize?: "sm" | "md" | "lg";
  stickySidebar?: boolean;
}

function SidebarLayout({
  className,
  sidebar,
  header,
  footer,
  sidebarPosition = "start",
  sidebarSize = "md",
  stickySidebar = true,
  children,
  ...props
}: SidebarLayoutProps) {
  const aside = (
    <aside
      data-slot="sidebar-layout-sidebar"
      className={cn(
        "min-w-0",
        stickySidebar && "lg:sticky lg:top-8 lg:self-start",
      )}
    >
      {sidebar}
    </aside>
  );

  return (
    <div
      data-slot="sidebar-layout"
      className={cn(
        "mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6",
        columns[sidebarPosition][sidebarSize],
        className,
      )}
      {...props}
    >
      {sidebarPosition === "start" ? aside : null}
      <div data-slot="sidebar-layout-content" className="min-w-0">
        {header ? (
          <div data-slot="sidebar-layout-header" className="mb-6">
            {header}
          </div>
        ) : null}
        {children}
        {footer ? (
          <div data-slot="sidebar-layout-footer" className="mt-8">
            {footer}
          </div>
        ) : null}
      </div>
      {sidebarPosition === "end" ? aside : null}
    </div>
  );
}

export { SidebarLayout };
