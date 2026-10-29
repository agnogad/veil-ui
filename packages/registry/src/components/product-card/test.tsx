import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProductCardBasic } from "./demo";

describe("Product Card", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProductCardBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProductCardBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
