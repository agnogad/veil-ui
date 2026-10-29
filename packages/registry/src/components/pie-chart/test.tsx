import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PieChartBasic } from "./demo";

describe("Pie Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<PieChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PieChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
