import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home, Search } from "lucide-react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Dock } from "./index";

describe("Dock", () => {
  it("renders links and buttons", () => {
    render(
      <Dock
        items={[
          { label: "Home", icon: Home, href: "#home" },
          { label: "Search", icon: Search, onClick: () => {} },
        ]}
      />,
    );
    expect(screen.getByRole("toolbar", { name: "Dock" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "#home",
    );
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls onClick for button items", async () => {
    const onClick = vi.fn();
    render(<Dock items={[{ label: "Search", icon: Search, onClick }]} />);
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Dock items={[{ label: "Home", icon: Home, href: "#home" }]} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
