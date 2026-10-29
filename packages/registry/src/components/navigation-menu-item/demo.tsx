"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../navigation-menu/index";
import { NavigationMenuItem } from "./index";

export function NavigationMenuItemBasic() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavigationMenuItemWithDescription() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs" className="w-56">
            <span className="block text-sm font-medium">Documentation</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Guides, components and API reference.
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#changelog" className="w-56">
            <span className="block text-sm font-medium">Changelog</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              What shipped in the latest release.
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
