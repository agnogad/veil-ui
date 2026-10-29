import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MetricCardBasic } from "./demo";

describe("Metric Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<MetricCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MetricCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
