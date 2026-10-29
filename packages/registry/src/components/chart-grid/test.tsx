import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ChartGridBasic } from "./demo";

describe("Chart Grid", () => {
  it("renders the basic example", () => {
    const { container } = render(<ChartGridBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ChartGridBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
