"use client";

import { ChevronDown } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEventHandler,
} from "react";

import { cn } from "@veil-ui/utils";

import { Button, type ButtonProps } from "../button/index";

interface SplitButtonAction {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
}

interface SplitButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  /** Label of the primary action. */
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Menu entries shown next to the primary action. */
  items: SplitButtonAction[];
  /** Which edge the menu aligns to. */
  align?: "start" | "end";
}

function SplitButton({
  label,
  onClick,
  items,
  align = "end",
  className,
  variant,
  size,
  disabled,
  ...props
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"]:not(:disabled)',
    );
    first?.focus();
  }, [open]);

  function close(refocus = true) {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const entries = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not(:disabled)',
      ) ?? [],
    );
    if (entries.length === 0) return;

    const index = entries.indexOf(document.activeElement as HTMLElement);
    const next =
      event.key === "ArrowDown"
        ? entries[(index + 1) % entries.length]
        : entries[(index - 1 + entries.length) % entries.length];
    next?.focus();
  }

  return (
    <div
      ref={containerRef}
      data-slot="split-button"
      className={cn("relative inline-flex items-stretch", className)}
    >
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
        className="rounded-r-none"
        {...props}
      >
        {label}
      </Button>
      <Button
        ref={triggerRef}
        variant={variant}
        size={size}
        disabled={disabled}
        aria-label={`More ${label} options`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="rounded-l-none border-l border-primary-foreground/20 px-2"
      >
        <ChevronDown aria-hidden />
      </Button>
      {open ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label={`${label} options`}
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute top-full z-50 mt-1 min-w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.();
                close();
              }}
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export { SplitButton };
