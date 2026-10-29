import { ArrowRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface UseCaseItem {
  title: string;
  description: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

interface UseCasesSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  cases: UseCaseItem[];
}

function UseCasesSection({
  className,
  title,
  description,
  cases,
  ...props
}: UseCasesSectionProps) {
  return (
    <div data-slot="use-cases-section" className={cn("grid gap-6", className)} {...props}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => {
          const content = (
            <>
              {item.icon ? (
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4">
                  {item.icon}
                </span>
              ) : null}
              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
              {item.href ? (
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Learn more <ArrowRight className="size-3" aria-hidden />
                </span>
              ) : null}
            </>
          );

          return item.href ? (
            <a
              key={item.title}
              href={item.href}
              className="rounded-lg border bg-background p-5 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {content}
            </a>
          ) : (
            <div key={item.title} className="rounded-lg border bg-background p-5">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { UseCasesSection };
export type { UseCaseItem, UseCasesSectionProps };
