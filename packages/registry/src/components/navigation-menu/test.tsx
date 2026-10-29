import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./index";

function Example() {
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

describe("NavigationMenu", () => {
  it("renders a navigation landmark with a trigger", () => {
    render(<Example />);
    expect(screen.getByRole("navigation", { name: "Main" })).toHaveAttribute(
      "data-slot",
      "navigation-menu",
    );
    expect(
      screen.getByRole("button", { name: "Resources" }),
    ).toBeInTheDocument();
  });

  it("reveals content when opened", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Resources" }));
    expect(
      await screen.findByRole("link", { name: "Docs" }),
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
