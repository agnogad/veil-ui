import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface IntegrationItem {
  name: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

interface IntegrationsSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  integrations: IntegrationItem[];
}

function IntegrationsSection({
  className,
  title,
  description,
  integrations,
  ...props
}: IntegrationsSectionProps) {
  return (
    <div data-slot="integrations-section" className={cn("grid gap-6", className)} {...props}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {integrations.map((integration) => (
          <li
            key={integration.name}
            className="flex items-center gap-3 rounded-lg border bg-background p-3"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:size-4">
              {integration.icon ?? (
                <span className="text-xs font-semibold">
                  {integration.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {integration.name}
              </span>
              {integration.description ? (
                <span className="block truncate text-xs text-muted-foreground">
                  {integration.description}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { IntegrationsSection };
export type { IntegrationItem, IntegrationsSectionProps };
