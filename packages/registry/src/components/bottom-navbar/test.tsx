import { render, screen } from "@testing-library/react";
import { Home } from "lucide-react";
import { describe, expect, it } from "vitest";

import { BottomNavbar } from "./index";

describe("BottomNavbar", () => {
  it("re-exports Bottom Navigation as BottomNavbar", () => {
    render(
      <BottomNavbar items={[{ label: "Home", icon: Home, href: "#home" }]} />,
    );
    expect(
      screen.getByRole("navigation", { name: "Bottom" }),
    ).toHaveAttribute("data-slot", "bottom-navigation");
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });
});
