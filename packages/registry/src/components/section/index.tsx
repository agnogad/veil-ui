import type * as React from "react";

import { cn } from "@veil-ui/utils";

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn("grid gap-4", className)}
      {...props}
    />
  );
}

function SectionHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-wrap items-start justify-between gap-3",
        className,
      )}
      {...props}
    />
  );
}

function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="section-title"
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function SectionDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function SectionActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-actions"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

function SectionContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-content"
      className={cn("grid gap-4", className)}
      {...props}
    />
  );
}

export {
  Section,
  SectionActions,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
};
