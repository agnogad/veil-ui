import { ArrowUpRight } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface CaseStudyItem {
  company: string;
  title: string;
  summary: React.ReactNode;
  metric: React.ReactNode;
  metricLabel: string;
  href?: string;
}

interface CaseStudiesSectionProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  studies: CaseStudyItem[];
}

function CaseStudiesSection({
  className,
  title,
  description,
  studies,
  ...props
}: CaseStudiesSectionProps) {
  return (
    <div data-slot="case-studies-section" className={cn("grid gap-6", className)} {...props}>
      {title || description ? (
        <div className="mx-auto max-w-2xl text-center">
          {title ? (
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {studies.map((study) => (
          <article
            key={study.title}
            className="flex flex-col gap-3 rounded-xl border bg-background p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {study.company}
            </p>
            <h3 className="text-base font-semibold">{study.title}</h3>
            <p className="text-sm text-muted-foreground">{study.summary}</p>
            <div className="mt-auto flex items-end justify-between gap-3 pt-2">
              <div>
                <p className="text-2xl font-semibold tracking-tight">
                  {study.metric}
                </p>
                <p className="text-xs text-muted-foreground">
                  {study.metricLabel}
                </p>
              </div>
              {study.href ? (
                <a
                  href={study.href}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Read story <ArrowUpRight className="size-3" aria-hidden />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export { CaseStudiesSection };
export type { CaseStudiesSectionProps, CaseStudyItem };
