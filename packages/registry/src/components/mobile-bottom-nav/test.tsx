import { render, screen } from "@testing-library/react";
import { Home, Search } from "lucide-react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MobileBottomNav } from "./index";

const items = [
  { label: "Home", icon: Home, href: "#home", active: true },
  { label: "Search", icon: Search, href: "#search", badge: "2" },
];

describe("MobileBottomNav", () => {
  it("re-exports BottomNavigation with mobile naming", () => {
    render(<MobileBottomNav items={items} />);
    const nav = screen.getByRole("navigation", { name: "Bottom" });
    expect(nav).toHaveAttribute("data-slot", "bottom-navigation");
    expect(nav).toHaveAttribute("data-variant", "default");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("supports the floating variant", () => {
    render(<MobileBottomNav items={items} variant="floating" />);
    expect(screen.getByRole("navigation", { name: "Bottom" })).toHaveAttribute(
      "data-variant",
      "floating",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileBottomNav items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
