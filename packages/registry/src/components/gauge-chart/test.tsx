import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { GaugeChartBasic } from "./demo";

describe("Gauge Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<GaugeChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<GaugeChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
