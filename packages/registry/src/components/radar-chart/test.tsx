import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { RadarChartBasic } from "./demo";

describe("Radar Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<RadarChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RadarChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
