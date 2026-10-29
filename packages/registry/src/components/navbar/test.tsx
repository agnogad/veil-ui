import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Navbar } from "./index";

describe("Navbar", () => {
  it("renders a header with navigation content", () => {
    render(
      <Navbar>
        <a href="/">Home</a>
      </Navbar>,
    );
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-slot", "navbar");
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("can stick to the top", () => {
    render(<Navbar sticky />);
    expect(screen.getByRole("banner")).toHaveClass("sticky", "top-0");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Navbar>
        <nav aria-label="Main">
          <a href="/docs">Docs</a>
        </nav>
      </Navbar>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
