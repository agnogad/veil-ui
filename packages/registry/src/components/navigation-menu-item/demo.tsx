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
