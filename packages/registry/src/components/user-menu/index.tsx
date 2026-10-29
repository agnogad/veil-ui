"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu/index";

interface UserMenuItem {
  label: string;
  href?: string;
  onSelect?: () => void;
  icon?: React.ReactNode;
}

interface UserMenuProps extends React.ComponentProps<"div"> {
  name: string;
  email: string;
  avatarSrc?: string;
  items?: UserMenuItem[];
  onSignOut?: () => void;
}

function UserMenu({
  className,
  name,
  email,
  avatarSrc,
  items = [
    { label: "Profile", href: "#profile", icon: <User /> },
    { label: "Settings", href: "#settings", icon: <Settings /> },
  ],
  onSignOut,
  ...props
}: UserMenuProps) {
  const fallback = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div data-slot="user-menu" className={cn("inline-flex", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={`Open menu for ${name}`}
            className="inline-flex items-center gap-2 rounded-full border bg-background p-1 pr-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar size="sm">
              {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <span className="hidden max-w-32 truncate sm:block">{name}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) =>
            item.href ? (
              <DropdownMenuItem key={item.label} asChild>
                <a href={item.href} className="[&_svg]:size-4">
                  {item.icon}
                  {item.label}
                </a>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={item.label}
                onSelect={item.onSelect}
                className="[&_svg]:size-4"
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ),
          )}
          {onSignOut ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={onSignOut}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="size-4" aria-hidden /> Sign out
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { UserMenu };
export type { UserMenuItem, UserMenuProps };
