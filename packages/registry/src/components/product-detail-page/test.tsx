import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProductDetailPageBasic } from "./demo";

describe("Product Detail Page", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProductDetailPageBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProductDetailPageBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
