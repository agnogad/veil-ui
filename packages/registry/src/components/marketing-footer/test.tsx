import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { MarketingFooterBasic } from "./demo";

describe("Marketing Footer", () => {
  it("renders the basic example", () => {
    const { container } = render(<MarketingFooterBasic />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MarketingFooterBasic />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
