"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

import { cn } from "@veil-ui/utils";

import { IconButton, type IconButtonProps } from "../icon-button/index";

interface CopyButtonProps
  extends Omit<IconButtonProps, "children" | "aria-label"> {
  /** Text written to the clipboard. */
  value: string;
  /** Accessible name before copying. */
  label?: string;
  /** Accessible name and announcement after copying. */
  copiedLabel?: string;
  /** How long the copied state lasts, in milliseconds. */
  timeout?: number;
}

function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  timeout = 1600,
  className,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy(
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), timeout);
    } catch {
      setCopied(false);
    }
    onClick?.(event);
  }

  return (
    <>
      <IconButton
        data-slot="copy-button"
        data-copied={copied ? "" : undefined}
        aria-label={copied ? copiedLabel : label}
        className={cn(className)}
        onClick={handleCopy}
        {...props}
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      </IconButton>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}

export { CopyButton };
