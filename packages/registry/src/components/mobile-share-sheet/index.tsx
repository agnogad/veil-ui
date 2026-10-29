"use client";

import { Check, Copy, Link2, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
} from "../bottom-sheet/index";

interface MobileShareTarget {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface MobileShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title?: string;
  targets?: MobileShareTarget[];
}

const defaultTargets: MobileShareTarget[] = [
  {
    label: "Email",
    icon: <Mail />,
    href: "mailto:?subject=Shared%20link",
  },
  {
    label: "Message",
    icon: <MessageCircle />,
    href: "#",
  },
  { label: "Send", icon: <Send />, href: "#" },
  { label: "Copy link", icon: <Link2 /> },
];

function MobileShareSheet({
  open,
  onOpenChange,
  url,
  title = "Share",
  targets = defaultTargets,
}: MobileShareSheetProps) {
  const [copied, setCopied] = useState(false);

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          <BottomSheetDescription className="truncate">
            {url}
          </BottomSheetDescription>
        </BottomSheetHeader>
        <ul className="grid grid-cols-4 gap-3" aria-label="Share targets">
          {targets.map((target) => {
            const isCopy = target.label.toLowerCase().includes("copy");
            const content = (
              <>
                <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5">
                  {isCopy && copied ? (
                    <Check className="size-5 text-primary" aria-hidden />
                  ) : (
                    (target.icon ?? <Link2 />)
                  )}
                </span>
                <span className="text-[11px] leading-tight">
                  {isCopy && copied ? "Copied" : target.label}
                </span>
              </>
            );
            const className = cn(
              "flex w-full flex-col items-center gap-1.5 rounded-lg py-2 text-center outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
            );

            if (isCopy) {
              return (
                <li key={target.label}>
                  <button
                    type="button"
                    className={className}
                    onClick={async () => {
                      try {
                        await navigator.clipboard?.writeText(url);
                        setCopied(true);
                      } catch {
                        setCopied(false);
                      }
                      target.onClick?.();
                    }}
                  >
                    {content}
                  </button>
                </li>
              );
            }

            if (target.href) {
              return (
                <li key={target.label}>
                  <a
                    href={target.href}
                    className={className}
                    onClick={() => {
                      target.onClick?.();
                      onOpenChange(false);
                    }}
                  >
                    {content}
                  </a>
                </li>
              );
            }

            return (
              <li key={target.label}>
                <button
                  type="button"
                  className={className}
                  onClick={() => {
                    target.onClick?.();
                    onOpenChange(false);
                  }}
                >
                  {content}
                </button>
              </li>
            );
          })}
        </ul>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export { MobileShareSheet };
export type { MobileShareSheetProps, MobileShareTarget };
