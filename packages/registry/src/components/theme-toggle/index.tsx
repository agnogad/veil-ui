"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { cn } from "@veil-ui/utils";

import { IconButton, type IconButtonProps } from "../icon-button/index";

type Theme = "light" | "dark";

const defaultStorageKey = "veil-theme";

interface ThemeToggleProps
  extends Omit<IconButtonProps, "children" | "aria-label"> {
  /** Storage key used to remember the choice. */
  storageKey?: string;
}

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ThemeToggle({
  className,
  storageKey: storage = defaultStorageKey,
  variant = "ghost",
  onClick,
  ...props
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(storage, next);
    } catch {
      // Storage can be unavailable in private or sandboxed contexts.
    }
    setTheme(next);
    onClick?.(event);
  }

  const isDark = theme === "dark";

  return (
    <IconButton
      data-slot="theme-toggle"
      data-theme={theme}
      variant={variant}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </IconButton>
  );
}

export { ThemeToggle, defaultStorageKey as themeStorageKey };
