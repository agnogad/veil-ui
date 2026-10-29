import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ScatterChartBasic } from "./demo";

describe("Scatter Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<ScatterChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ScatterChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
