import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ComparisonTableBasic } from "./demo";

describe("Comparison Table", () => {
  it("renders the basic example", () => {
    const { container } = render(<ComparisonTableBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ComparisonTableBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
