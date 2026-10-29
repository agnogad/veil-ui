import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { BarChartBasic } from "./demo";

describe("Bar Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<BarChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BarChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
