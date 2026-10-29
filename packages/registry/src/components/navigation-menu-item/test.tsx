import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../navigation-menu/index";
import { NavigationMenuItem } from "./index";

describe("NavigationMenuItem", () => {
  it("re-exports NavigationMenuItem", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const item = screen.getByRole("link", { name: "Docs" }).parentElement;
    expect(item).toHaveAttribute("data-slot", "navigation-menu-item");
  });
});
