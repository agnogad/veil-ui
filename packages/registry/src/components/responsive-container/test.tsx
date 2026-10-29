import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ResponsiveContainer } from "./index";

describe("ResponsiveContainer", () => {
  it("centers content with a large default width", () => {
    render(<ResponsiveContainer data-testid="container" />);
    const container = screen.getByTestId("container");
    expect(container).toHaveClass("mx-auto", "max-w-5xl", "px-4");
    expect(container).toHaveAttribute("data-slot", "responsive-container");
  });

  it("can be fluid", () => {
    render(<ResponsiveContainer fluid data-testid="container" />);
    expect(screen.getByTestId("container")).not.toHaveClass("mx-auto");
  });

  it("applies gutter presets", () => {
    render(<ResponsiveContainer gutter="lg" data-testid="container" />);
    expect(screen.getByTestId("container")).toHaveClass("px-6", "sm:px-8");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ResponsiveContainer>
        <h1>Title</h1>
      </ResponsiveContainer>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
