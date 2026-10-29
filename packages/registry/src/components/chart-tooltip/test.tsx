import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ChartTooltipBasic } from "./demo";

describe("Chart Tooltip", () => {
  it("renders the basic example", () => {
    const { container } = render(<ChartTooltipBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ChartTooltipBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
