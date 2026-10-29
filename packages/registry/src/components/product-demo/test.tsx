import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ProductDemoBasic } from "./demo";

describe("Product Demo", () => {
  it("renders the basic example", () => {
    const { container } = render(<ProductDemoBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProductDemoBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
