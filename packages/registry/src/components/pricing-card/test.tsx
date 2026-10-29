import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PricingCardBasic } from "./demo";

describe("Pricing Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<PricingCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PricingCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
