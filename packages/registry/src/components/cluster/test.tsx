import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Cluster } from "./index";

describe("Cluster", () => {
  it("wraps items with a default gap", () => {
    render(<Cluster data-testid="cluster" />);
    const cluster = screen.getByTestId("cluster");
    expect(cluster).toHaveClass("flex", "flex-wrap", "gap-2", "items-center");
  });

  it("supports custom gap and justification", () => {
    render(<Cluster gap="lg" justify="between" data-testid="cluster" />);
    expect(screen.getByTestId("cluster")).toHaveClass("gap-6", "justify-between");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Cluster>
        <span>One</span>
        <span>Two</span>
      </Cluster>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
