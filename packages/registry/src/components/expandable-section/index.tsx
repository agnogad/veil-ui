"use client";

import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible/index";

interface ExpandableSectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

function ExpandableSection({
  title,
  description,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled = false,
  className,
}: ExpandableSectionProps) {
  return (
    <Collapsible
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disabled={disabled}
      data-slot="expandable-section"
      className={cn(
        "w-full overflow-hidden rounded-lg border bg-card text-card-foreground",
        className,
      )}
    >
      <CollapsibleTrigger
        disabled={disabled}
        className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{title}</span>
          {description ? (
            <span className="text-sm text-muted-foreground">{description}</span>
          ) : null}
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t px-4 py-4 text-sm">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { ExpandableSection };
