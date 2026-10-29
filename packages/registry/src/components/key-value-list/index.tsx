"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface KeyValueItem {
  label: React.ReactNode;
  value: React.ReactNode;
  copyValue?: string;
}

interface KeyValueListProps extends React.ComponentProps<"dl"> {
  items: KeyValueItem[];
  columns?: 1 | 2;
}

function KeyValueList({
  className,
  items,
  columns = 1,
  ...props
}: KeyValueListProps) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  return (
    <dl
      data-slot="key-value-list"
      className={cn(
        "grid gap-x-6 gap-y-3 text-sm",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => {
        const key = typeof item.label === "string" ? item.label : `item-${index}`;
        return (
          <div key={key} className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground">{item.label}</dt>
            <dd className="flex items-center gap-2 font-medium">
              <span>{item.value}</span>
              {item.copyValue ? (
                <button
                  type="button"
                  onClick={() => copy(key, item.copyValue!)}
                  aria-label={`Copy ${key}`}
                  className="inline-flex size-6 items-center justify-center rounded text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {copied === key ? (
                    <Check className="size-3.5" aria-hidden />
                  ) : (
                    <Copy className="size-3.5" aria-hidden />
                  )}
                </button>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export { KeyValueList, type KeyValueItem };
