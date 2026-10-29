import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CheckoutPageBasic } from "./demo";

describe("Checkout Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<CheckoutPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CheckoutPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
