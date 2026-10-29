import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { HeatmapBasic } from "./demo";

describe("Heatmap", () => {
  it("renders the basic example", () => {
    const { container } = render(<HeatmapBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<HeatmapBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
