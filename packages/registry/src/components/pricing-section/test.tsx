import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PricingSectionBasic } from "./demo";

describe("Pricing Section", () => {
  it("renders the basic example", () => {
    const { container } = render(<PricingSectionBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PricingSectionBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
