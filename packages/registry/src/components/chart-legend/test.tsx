import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ChartLegendBasic } from "./demo";

describe("Chart Legend", () => {
  it("renders the basic example", () => {
    const { container } = render(<ChartLegendBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ChartLegendBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
