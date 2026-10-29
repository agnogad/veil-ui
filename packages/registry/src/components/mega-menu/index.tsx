"use client";

import type * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu/index";

interface MegaMenuLink {
  label: string;
  description?: string;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

interface MegaMenuItem {
  label: string;
  columns: MegaMenuColumn[];
}

interface MegaMenuProps extends React.ComponentProps<typeof NavigationMenu> {
  items: MegaMenuItem[];
}

function MegaMenu({ items, ...props }: MegaMenuProps) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(40rem,90vw)] p-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {item.columns.map((column) => (
                  <div key={column.title}>
                    <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {column.title}
                    </p>
                    <ul className="grid gap-0.5">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <NavigationMenuLink href={link.href}>
                            <span className="block text-sm font-medium">
                              {link.label}
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                {link.description}
                              </span>
                            ) : null}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export { MegaMenu };
export type { MegaMenuLink, MegaMenuColumn, MegaMenuItem, MegaMenuProps };
