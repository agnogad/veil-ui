"use client";

import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Heart,
  Home,
  Mail,
  Search,
  Settings,
  Star,
  Trash2,
  Upload,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface IconPickerItem {
  name: string;
  icon: LucideIcon;
}

const defaultIcons: IconPickerItem[] = [
  { name: "ArrowRight", icon: ArrowRight },
  { name: "Check", icon: Check },
  { name: "Copy", icon: Copy },
  { name: "Download", icon: Download },
  { name: "Heart", icon: Heart },
  { name: "Home", icon: Home },
  { name: "Mail", icon: Mail },
  { name: "Search", icon: Search },
  { name: "Settings", icon: Settings },
  { name: "Star", icon: Star },
  { name: "Trash", icon: Trash2 },
  { name: "Upload", icon: Upload },
  { name: "User", icon: User },
  { name: "X", icon: X },
];

interface IconPickerProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  icons?: IconPickerItem[];
  value?: string;
  onSelect?: (item: IconPickerItem) => void;
}

function IconPicker({
  icons = defaultIcons,
  value,
  onSelect,
  className,
  ...props
}: IconPickerProps) {
  const [query, setQuery] = useState("");
  const filtered = icons.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div
      data-slot="icon-picker"
      className={cn("grid gap-2", className)}
      {...props}
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search icons"
        aria-label="Search icons"
        className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div className="grid grid-cols-7 gap-1">
        {filtered.length === 0 ? (
          <p className="col-span-full py-4 text-center text-xs text-muted-foreground">
            No icons found.
          </p>
        ) : (
          filtered.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                aria-pressed={value === item.name}
                onClick={() => onSelect?.(item)}
                className={cn(
                  "flex items-center justify-center rounded-md border border-transparent p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  value === item.name &&
                    "border-border bg-accent text-accent-foreground",
                )}
              >
                <IconComponent className="size-4" aria-hidden />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export { IconPicker, defaultIcons };
export type { IconPickerItem, IconPickerProps };
