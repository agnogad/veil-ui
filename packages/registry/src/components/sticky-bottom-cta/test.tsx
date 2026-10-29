import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { StickyBottomCtaBasic } from "./demo";

describe("Sticky Bottom CTA", () => {
  it("renders the basic example", () => {
    const { container } = render(<StickyBottomCtaBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<StickyBottomCtaBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
