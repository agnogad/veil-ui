import { render, screen } from "@testing-library/react";
import { Home, Search } from "lucide-react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { BottomNavigation } from "./index";

const items = [
  { label: "Home", icon: Home, href: "#home", active: true },
  { label: "Search", icon: Search, href: "#search", badge: "2" },
];

describe("BottomNavigation", () => {
  it("renders navigation links", () => {
    render(<BottomNavigation items={items} />);
    const nav = screen.getByRole("navigation", { name: "Bottom" });
    expect(nav).toHaveAttribute("data-slot", "bottom-navigation");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders badges", () => {
    render(<BottomNavigation items={items} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BottomNavigation items={items} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
