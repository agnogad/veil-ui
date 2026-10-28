import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 *
 * Every Veil UI component uses this helper. When a component is copied into a
 * project, `@veil-ui/utils` is rewritten to the project's utils alias
 * (default: `@/lib/utils`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Join ids into a stable `aria-describedby` value. */
export function describedBy(...ids: Array<string | undefined | false>) {
  const value = ids.filter(Boolean).join(" ");
  return value.length > 0 ? value : undefined;
}
