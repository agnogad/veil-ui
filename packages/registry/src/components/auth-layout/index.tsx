import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface AuthLayoutProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  brand?: React.ReactNode;
  highlights?: string[];
  footer?: React.ReactNode;
}

function AuthLayout({
  className,
  title = "Veil UI",
  description = "Accessible components for product teams.",
  brand,
  highlights = [],
  footer,
  children,
  ...props
}: AuthLayoutProps) {
  return (
    <div
      data-slot="auth-layout"
      className={cn(
        "grid min-h-[560px] w-full overflow-hidden rounded-xl border bg-background md:grid-cols-2",
        className,
      )}
      {...props}
    >
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/20 via-muted to-background p-8 md:flex">
        <div>
          <p className="text-base font-semibold tracking-tight">
            {brand ?? title}
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        {highlights.length > 0 ? (
          <ul className="grid gap-3 text-sm">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="text-xs text-muted-foreground">
          © 2026 Veil UI. All rights reserved.
        </p>
      </aside>
      <div className="flex flex-col items-center justify-center gap-6 p-6 sm:p-10">
        <div className="w-full max-w-sm">{children}</div>
        {footer ? (
          <div className="text-center text-xs text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { AuthLayout };
export type { AuthLayoutProps };
