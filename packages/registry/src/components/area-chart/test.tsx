import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { AreaChartBasic } from "./demo";

describe("Area Chart", () => {
  it("renders the basic example", () => {
    const { container } = render(<AreaChartBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AreaChartBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
