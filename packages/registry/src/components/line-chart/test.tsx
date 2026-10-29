import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LineChartBasic } from "./demo";

describe("Line Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<LineChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LineChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
