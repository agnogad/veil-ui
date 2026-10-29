import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Box } from "./index";

describe("Box", () => {
  it("renders a div with its data-slot", () => {
    render(<Box data-testid="box" />);
    const box = screen.getByTestId("box");
    expect(box.tagName).toBe("DIV");
    expect(box).toHaveAttribute("data-slot", "box");
  });

  it("applies padding variants", () => {
    render(<Box padding="lg" data-testid="box" />);
    expect(screen.getByTestId("box")).toHaveClass("p-6");
  });

  it("renders a single child when asChild is set", () => {
    render(
      <Box asChild>
        <a href="/docs">Docs</a>
      </Box>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "data-slot",
      "box",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Box padding="md">
        <p>Content</p>
      </Box>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
