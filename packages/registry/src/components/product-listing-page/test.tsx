import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProductListingPageBasic } from "./demo";

describe("Product Listing Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProductListingPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProductListingPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
