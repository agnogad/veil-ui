import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface MobileAppShellProps extends React.ComponentProps<"div"> {
  /** Fixed top region, usually a MobileHeader. */
  header?: React.ReactNode;
  /** Fixed bottom region, usually a tab bar or bottom bar. */
  footer?: React.ReactNode;
  /** Positioned floating element rendered inside the shell. */
  floating?: React.ReactNode;
}

function MobileAppShell({
  className,
  header,
  footer,
  floating,
  children,
  ...props
}: MobileAppShellProps) {
  return (
    <div
      data-slot="mobile-app-shell"
      className={cn(
        "relative flex h-[600px] w-full max-w-sm flex-col overflow-hidden rounded-xl border bg-background shadow-sm",
        className,
      )}
      {...props}
    >
      {header}
      <main className="flex-1 overflow-y-auto overscroll-contain">
        {children}
      </main>
      {footer}
      {floating}
    </div>
  );
}

export { MobileAppShell };
export type { MobileAppShellProps };
