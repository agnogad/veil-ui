import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { GridItem } from "./index";

describe("GridItem", () => {
  it("spans one column by default", () => {
    render(<GridItem data-testid="item" />);
    const item = screen.getByTestId("item");
    expect(item).toHaveClass("col-span-1", "row-span-1");
    expect(item).toHaveAttribute("data-slot", "grid-item");
  });

  it("applies column and row spans", () => {
    render(<GridItem colSpan={8} rowSpan={2} data-testid="item" />);
    expect(screen.getByTestId("item")).toHaveClass("col-span-8", "row-span-2");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div className="grid grid-cols-12">
        <GridItem colSpan={6}>
          <p>Cell</p>
        </GridItem>
      </div>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
