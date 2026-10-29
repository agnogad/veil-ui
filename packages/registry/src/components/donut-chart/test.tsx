import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { DonutChartBasic } from "./demo";

describe("Donut Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<DonutChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DonutChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
