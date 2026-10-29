import { render, screen } from "@testing-library/react";
import { Home, Settings } from "lucide-react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { NavigationRail } from "./index";

const items = [
  { label: "Home", icon: Home, href: "#home" },
  { label: "Settings", icon: Settings, href: "#settings", active: true },
];

describe("NavigationRail", () => {
  it("renders labelled icon links", () => {
    render(<NavigationRail items={items} />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).toHaveAttribute("data-slot", "navigation-rail");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "title",
      "Home",
    );
  });

  it("marks the active item", () => {
    render(<NavigationRail items={items} />);
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NavigationRail items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
