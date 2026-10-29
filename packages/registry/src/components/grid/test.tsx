import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Grid } from "./index";

describe("Grid", () => {
  it("renders three responsive columns by default", () => {
    render(<Grid data-testid="grid" />);
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveAttribute("data-cols", "3");
    expect(grid).toHaveClass("grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3");
  });

  it("supports custom gaps", () => {
    render(<Grid gap="lg" data-testid="grid" />);
    expect(screen.getByTestId("grid")).toHaveClass("gap-6");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Grid cols={2}>
        <p>One</p>
        <p>Two</p>
      </Grid>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
